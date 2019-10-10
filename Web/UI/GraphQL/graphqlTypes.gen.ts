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
  fileSize: Scalars['Int'],
  client: Client,
};

export enum BackupState {
  Streaming = 'STREAMING',
  Finished = 'FINISHED'
}

export type Client = {
   __typename?: 'Client',
  id: Scalars['ID'],
  schedules: Array<Schedule>,
  path: Scalars['String'],
  backups: Array<Backup>,
  folderSize: Scalars['Int'],
};

export type ClientEvent = {
   __typename?: 'ClientEvent',
  type: ClientEventType,
};

export enum ClientEventType {
  Backup = 'BACKUP'
}

export type ClientInput = {
  path: Scalars['String'],
};

export type Configuration = {
   __typename?: 'Configuration',
  id: Scalars['ID'],
};

export type CreateClientInput = {
  path: Scalars['String'],
};

export type CreateScheduleInput = {
  time: Scalars['String'],
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
  deleteBackup: Client,
  createClient: Service,
  updateClient: Service,
  createSchedule: Client,
  emitClientEvent: Client,
  initialConfiguration: Configuration,
  updateSchedule: Client,
  createService: ServiceOutput,
  updateService: Array<Service>,
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


export type MutationDeleteBackupArgs = {
  backupId: Scalars['ID']
};


export type MutationCreateClientArgs = {
  input: CreateClientInput,
  serviceId: Scalars['ID']
};


export type MutationUpdateClientArgs = {
  update?: Maybe<ClientInput>,
  clientId: Scalars['ID']
};


export type MutationCreateScheduleArgs = {
  input: CreateScheduleInput,
  clientId: Scalars['ID']
};


export type MutationEmitClientEventArgs = {
  clientId: Scalars['ID']
};


export type MutationInitialConfigurationArgs = {
  user: UserInput
};


export type MutationUpdateScheduleArgs = {
  update?: Maybe<ScheduleInput>,
  scheduleId: Scalars['ID']
};


export type MutationCreateServiceArgs = {
  input: ServiceInput
};


export type MutationUpdateServiceArgs = {
  update?: Maybe<ServiceInput>,
  serviceId: Scalars['ID']
};


export type MutationCreateUtilityArgs = {
  input: CreateUtilityInput
};

export type Query = {
   __typename?: 'Query',
  currentUser?: Maybe<CurrentUser>,
  client: Client,
  getClientToken: Scalars['String'],
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


export type QueryGetClientTokenArgs = {
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

export type Schedule = {
   __typename?: 'Schedule',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  time: Scalars['String'],
};

export type ScheduleInput = {
  time?: Maybe<Scalars['String']>,
};

export type Service = {
   __typename?: 'Service',
  id: Scalars['ID'],
  name: Scalars['String'],
  totalSize: Scalars['Int'],
  clients: Array<Maybe<Client>>,
};

export type ServiceInput = {
  name: Scalars['String'],
};

export type ServiceOutput = {
   __typename?: 'ServiceOutput',
  services: Array<Service>,
  service: Service,
};

export type Subscription = {
   __typename?: 'Subscription',
  getLatestBackup: Scalars['String'],
  clientEvents: ClientEvent,
};


export type SubscriptionGetLatestBackupArgs = {
  clientToken: Scalars['String']
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
export type DeleteBackupMutationVariables = {
  backupId: Scalars['ID']
};


export type DeleteBackupMutation = (
  { __typename?: 'Mutation' }
  & { deleteBackup: (
    { __typename?: 'Client' }
    & Pick<Client, 'path' | 'id'>
    & { backups: Array<(
      { __typename?: 'Backup' }
      & Pick<Backup, 'createdAt' | 'state' | 'id'>
    )> }
  ) }
);

export type ClientQueryVariables = {
  clientId: Scalars['ID']
};


export type ClientQuery = (
  { __typename?: 'Query' }
  & { client: (
    { __typename?: 'Client' }
    & Pick<Client, 'path' | 'id'>
    & { schedules: Array<(
      { __typename?: 'Schedule' }
      & Pick<Schedule, 'id' | 'createdAt' | 'updatedAt' | 'time'>
    )>, backups: Array<(
      { __typename?: 'Backup' }
      & Pick<Backup, 'id' | 'updatedAt' | 'createdAt' | 'state' | 'fileSize'>
    )> }
  ) }
);

export type GetClientTokenQueryVariables = {
  clientId: Scalars['ID']
};


export type GetClientTokenQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getClientToken'>
);

export type StartBackupMutationVariables = {
  clientId: Scalars['ID']
};


export type StartBackupMutation = (
  { __typename?: 'Mutation' }
  & { emitClientEvent: (
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'path'>
    & { backups: Array<(
      { __typename?: 'Backup' }
      & Pick<Backup, 'id' | 'updatedAt' | 'createdAt' | 'state' | 'fileSize'>
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

export type CreateScheduleMutationVariables = {
  clientId: Scalars['ID'],
  input: CreateScheduleInput
};


export type CreateScheduleMutation = (
  { __typename?: 'Mutation' }
  & { createSchedule: (
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'path'>
    & { schedules: Array<(
      { __typename?: 'Schedule' }
      & Pick<Schedule, 'id' | 'createdAt' | 'updatedAt' | 'time'>
    )> }
  ) }
);

export type UpdateScheduleMutationVariables = {
  scheduleId: Scalars['ID'],
  update?: Maybe<ScheduleInput>
};


export type UpdateScheduleMutation = (
  { __typename?: 'Mutation' }
  & { updateSchedule: (
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'path'>
    & { schedules: Array<(
      { __typename?: 'Schedule' }
      & Pick<Schedule, 'id' | 'updatedAt' | 'time'>
    )> }
  ) }
);

export type CreateServiceMutationVariables = {
  input: ServiceInput
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
      & Pick<Client, 'id' | 'path' | 'folderSize'>
    )>> }
  ) }
);

export type ServicesQueryVariables = {};


export type ServicesQuery = (
  { __typename?: 'Query' }
  & { services: Array<(
    { __typename?: 'Service' }
    & Pick<Service, 'id' | 'name' | 'totalSize'>
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
