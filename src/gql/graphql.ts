/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Channel = {
  __typename?: 'Channel';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  messages?: Maybe<Array<Maybe<Message>>>;
  name?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  profileId?: Maybe<Scalars['String']['output']>;
  server?: Maybe<Array<Maybe<Server>>>;
  serverId: Scalars['String']['output'];
  type: ChannelType;
  updatedAt: Scalars['String']['output'];
};

/** Defines the channel type */
export enum ChannelType {
  Text = 'TEXT',
  Video = 'VIDEO',
  Voice = 'VOICE',
}

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['String']['output'];
  deleted: Scalars['Boolean']['output'];
  directMessages?: Maybe<Array<Maybe<DirectMessage>>>;
  id: Scalars['ID']['output'];
  memberOne?: Maybe<Member>;
  memberOneId: Scalars['String']['output'];
  memberTwo?: Maybe<Member>;
  memberTwoId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CreateProfileInput = {
  email: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type DirectMessage = {
  __typename?: 'DirectMessage';
  content: Scalars['String']['output'];
  conversation?: Maybe<Conversation>;
  conversationId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  deleted: Scalars['Boolean']['output'];
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  member?: Maybe<Member>;
  memberId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Member = {
  __typename?: 'Member';
  conversationInitiated?: Maybe<Array<Maybe<Conversation>>>;
  conversationReceived?: Maybe<Array<Maybe<Conversation>>>;
  createdAt: Scalars['String']['output'];
  directMessages?: Maybe<Array<Maybe<DirectMessage>>>;
  id: Scalars['ID']['output'];
  messages?: Maybe<Array<Maybe<Message>>>;
  profile?: Maybe<Profile>;
  profileId: Scalars['String']['output'];
  role: MemberRole;
  server?: Maybe<Server>;
  serverId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

/** Defines the member role */
export enum MemberRole {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  Moderator = 'MODERATOR',
}

export type Message = {
  __typename?: 'Message';
  channel?: Maybe<Channel>;
  channelId?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  deleted: Scalars['Boolean']['output'];
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  member?: Maybe<Member>;
  memberId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProfile: Profile;
};

export type MutationCreateProfileArgs = {
  input: CreateProfileInput;
};

export type Profile = {
  __typename?: 'Profile';
  channels?: Maybe<Array<Maybe<Channel>>>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<Maybe<Member>>>;
  name: Scalars['String']['output'];
  servers?: Maybe<Array<Maybe<Server>>>;
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  profile: Profile;
  profileByEmail: Profile;
  profiles: Array<Profile>;
};

export type QueryProfileArgs = {
  profileId: Scalars['String']['input'];
};

export type QueryProfileByEmailArgs = {
  email: Scalars['String']['input'];
};

export type Server = {
  __typename?: 'Server';
  channels?: Maybe<Array<Maybe<Channel>>>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inviteCode: Scalars['String']['output'];
  members?: Maybe<Array<Maybe<Member>>>;
  name: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  profileId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CreateProfileMutationVariables = Exact<{
  input: CreateProfileInput;
}>;

export type CreateProfileMutation = {
  __typename?: 'Mutation';
  createProfile: {
    __typename?: 'Profile';
    id: string;
    name: string;
    imageUrl?: string | null;
    email: string;
    createdAt: string;
  };
};

export const CreateProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateProfileInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createProfile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateProfileMutation,
  CreateProfileMutationVariables
>;
