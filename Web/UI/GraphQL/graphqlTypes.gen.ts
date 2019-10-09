export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type AuthResponse = {
   __typename?: 'AuthResponse',
  token: Scalars['String'],
  currentUser: CurrentUser,
};

export type Backup = {
   __typename?: 'Backup',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  state: BackupState,
  client: Client,
};

export enum BackupState {
  Streaming = 'STREAMING',
  Finished = 'FINISHED'
}

export type Client = {
   __typename?: 'Client',
  id: Scalars['ID'],
  clientToken: Scalars['String'],
  path: Scalars['String'],
  backups: Array<Backup>,
};

export type ClientEvent = {
   __typename?: 'ClientEvent',
  type: ClientEventType,
};

export enum ClientEventType {
  Backup = 'BACKUP'
}

export type Configuration = {
   __typename?: 'Configuration',
  id: Scalars['ID'],
};

export type CreateClientInput = {
  path: Scalars['String'],
};

export type CreateServiceInput = {
  name: Scalars['String'],
};

export type CreateUtilityInput = {
  name: Scalars['String'],
};

export type CurrentUser = {
   __typename?: 'CurrentUser',
  id: Scalars['ID'],
  username: Scalars['String'],
  email: Scalars['String'],
  roles: Array<UserRole>,
};


export type LoginInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  login: AuthResponse,
  register: RegisterResponse,
  resetPasswordReset: Scalars['Boolean'],
  createBackup: Backup,
  pushBackupChunk: Scalars['Boolean'],
  finishBackup: Backup,
  createClient: Service,
  emitClientEvent: Scalars['Boolean'],
  initialConfiguration: Configuration,
  createService: ServiceOutput,
  createUtility: Utility,
};


export type MutationLoginArgs = {
  input: LoginInput
};


export type MutationRegisterArgs = {
  input: UserInput
};


export type MutationResetPasswordResetArgs = {
  input: RequestPasswordResetInput
};


export type MutationCreateBackupArgs = {
  clientToken: Scalars['String']
};


export type MutationPushBackupChunkArgs = {
  chunk: Scalars['String'],
  backupId: Scalars['ID']
};


export type MutationFinishBackupArgs = {
  backupId: Scalars['ID']
};


export type MutationCreateClientArgs = {
  input: CreateClientInput,
  serviceId: Scalars['ID']
};


export type MutationEmitClientEventArgs = {
  clientId: Scalars['ID']
};


export type MutationInitialConfigurationArgs = {
  user: UserInput
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput
};


export type MutationCreateUtilityArgs = {
  input: CreateUtilityInput
};

export type Query = {
   __typename?: 'Query',
  currentUser?: Maybe<CurrentUser>,
  client: Client,
  hasSetup: Scalars['Boolean'],
  services: Array<Service>,
  service: Service,
  users: Array<User>,
  user: User,
  utilities: Array<Utility>,
  helloWorld: Scalars['String'],
};


export type QueryClientArgs = {
  clientId: Scalars['ID']
};


export type QueryServiceArgs = {
  serviceId: Scalars['ID']
};


export type QueryUserArgs = {
  userId: Scalars['String']
};

export type RegisterResponse = {
   __typename?: 'RegisterResponse',
  success: Scalars['Boolean'],
  token: Scalars['String'],
  currentUser: CurrentUser,
};

export type RequestPasswordResetInput = {
  email: Scalars['String'],
};

export type ResetPasswordInput = {
  token: Scalars['String'],
  password: Scalars['String'],
};

export type Service = {
   __typename?: 'Service',
  id: Scalars['ID'],
  name: Scalars['String'],
  clients: Array<Maybe<Client>>,
};

export type ServiceOutput = {
   __typename?: 'ServiceOutput',
  services: Array<Service>,
  service: Service,
};

export type Subscription = {
   __typename?: 'Subscription',
  clientEvents: ClientEvent,
};


export type SubscriptionClientEventsArgs = {
  clientToken: Scalars['String']
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
};

export type UserInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export enum UserRole {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN'
}

export type Utility = {
   __typename?: 'Utility',
  id: Scalars['ID'],
  name: Scalars['String'],
};
export type ClientQueryVariables = {
  clientId: Scalars['ID']
};


export type ClientQuery = (
  { __typename?: 'Query' }
  & { client: (
    { __typename?: 'Client' }
    & Pick<Client, 'path' | 'id'>
    & { backups: Array<(
      { __typename?: 'Backup' }
      & Pick<Backup, 'id' | 'updatedAt' | 'createdAt' | 'state'>
    )> }
  ) }
);

export type CreateClientMutationVariables = {
  serviceId: Scalars['ID'],
  input: CreateClientInput
};


export type CreateClientMutation = (
  { __typename?: 'Mutation' }
  & { createClient: (
    { __typename?: 'Service' }
    & Pick<Service, 'id' | 'name'>
    & { clients: Array<Maybe<(
      { __typename?: 'Client' }
      & Pick<Client, 'path' | 'id'>
    )>> }
  ) }
);

export type CurrentUserFragment = (
  { __typename?: 'CurrentUser' }
  & Pick<CurrentUser, 'username' | 'id' | 'roles'>
);

export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<{ __typename?: 'CurrentUser' }
    & CurrentUserFragment
  > }
);

export type LoginMutationVariables = {
  input: LoginInput
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { currentUser: { __typename?: 'CurrentUser' }
      & CurrentUserFragment
     }
  ) }
);

export type RegisterMutationVariables = {
  input: UserInput
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'token'>
    & { currentUser: { __typename?: 'CurrentUser' }
      & CurrentUserFragment
     }
  ) }
);

export type CreateServiceMutationVariables = {
  input: CreateServiceInput
};


export type CreateServiceMutation = (
  { __typename?: 'Mutation' }
  & { createService: (
    { __typename?: 'ServiceOutput' }
    & { services: Array<(
      { __typename?: 'Service' }
      & Pick<Service, 'id' | 'name'>
    )> }
  ) }
);

export type ServiceQueryVariables = {
  serviceId: Scalars['ID']
};


export type ServiceQuery = (
  { __typename?: 'Query' }
  & { service: (
    { __typename?: 'Service' }
    & Pick<Service, 'id' | 'name'>
    & { clients: Array<Maybe<(
      { __typename?: 'Client' }
      & Pick<Client, 'id' | 'path'>
    )>> }
  ) }
);

export type ServicesQueryVariables = {};


export type ServicesQuery = (
  { __typename?: 'Query' }
  & { services: Array<(
    { __typename?: 'Service' }
    & Pick<Service, 'id' | 'name'>
  )> }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
  )> }
);

export type InitialConfigurationMutationVariables = {
  userInput: UserInput
};


export type InitialConfigurationMutation = (
  { __typename?: 'Mutation' }
  & { initialConfiguration: (
    { __typename?: 'Configuration' }
    & Pick<Configuration, 'id'>
  ) }
);

export type HelloWorldQueryVariables = {};


export type HelloWorldQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'helloWorld'>
);
