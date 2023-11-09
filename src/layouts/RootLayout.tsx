import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar.tsx';
import { useProfileStore } from '../stores/profileStore.ts';
import { useAuth, useSession } from '@clerk/clerk-react';
import { useMutation } from '@apollo/client';
import {
  CreateProfileMutation,
  CreateProfileMutationVariables,
  Profile,
} from '../gql/graphql.ts';
import { CREATE_PROFILE } from '../graphql/mutations/profile.mutation.ts';
import { useEffect } from 'react';

const RootLayout = () => {
  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);
  const { session } = useSession();
  const [createProfile] = useMutation<
    CreateProfileMutation,
    CreateProfileMutationVariables
  >(CREATE_PROFILE, {});
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      setProfile(null);
    }
  }, [isSignedIn, setProfile]);

  useEffect(() => {
    const createProfileFn = async () => {
      console.log('Session', session);
      if (!session?.user) {
        console.log('No session user');
        return;
      }
      try {
        console.log('Session user', session?.user);
        await createProfile({
          variables: {
            input: {
              email: session?.user.emailAddresses[0].emailAddress,
              name: session?.user?.fullName || '',
              imageUrl: session?.user.imageUrl,
            },
          },
          onCompleted: (data) => {
            setProfile(data?.createProfile as Profile);
          },
        });
      } catch (error) {
        console.log('Error creating profile in backend', error);
      }
    };

    if (profile?.id) return;
    createProfileFn();
    // .then(() => {})
    // .catch((error) => {
    //   console.log('Error creating profile in backend', error);
    // });
  }, [session, profile?.id, createProfile, setProfile]);

  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
