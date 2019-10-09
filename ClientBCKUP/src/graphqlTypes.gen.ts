export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AuthResponse = {
   __typename?: 'AuthResponse',
  token: Scalars['String'],
  currentUser: CurrentUser,
};

export type Backup = {
   __typename?: 'Backup',
  id: Scalars['ID'],
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

export type CreateBackupMutationVariables = {
  clientToken: Scalars['String']
};


export type CreateBackupMutation = (
  { __typename?: 'Mutation' }
  & { createBackup: (
    { __typename?: 'Backup' }
    & Pick<Backup, 'id' | 'state'>
    & { client: (
      { __typename?: 'Client' }
      & Pick<Client, 'path' | 'id'>
    ) }
  ) }
);

export type FinishBackupMutationVariables = {
  backupId: Scalars['ID']
};


export type FinishBackupMutation = (
  { __typename?: 'Mutation' }
  & { finishBackup: (
    { __typename?: 'Backup' }
    & Pick<Backup, 'id' | 'state'>
    & { client: (
      { __typename?: 'Client' }
      & Pick<Client, 'path' | 'id'>
    ) }
  ) }
);

export type PushBackupChunkMutationVariables = {
  backupId: Scalars['ID'],
  chunk: Scalars['String']
};


export type PushBackupChunkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'pushBackupChunk'>
);

export type ClientEventsSubscriptionVariables = {
  clientToken: Scalars['String']
};


export type ClientEventsSubscription = (
  { __typename?: 'Subscription' }
  & { clientEvents: (
    { __typename?: 'ClientEvent' }
    & Pick<ClientEvent, 'type'>
  ) }
);
