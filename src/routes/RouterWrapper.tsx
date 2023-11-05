import { Route, Routes, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import RootLayout from '../layouts/RootLayout.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import HomePage from '../pages/HomePage.tsx';
import { viteClerkPublishableKey } from '../constants';

const RouterWrapper = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={viteClerkPublishableKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="" element={<RootLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </ClerkProvider>
  );
};

export default RouterWrapper;
