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
export type HasSetupQueryVariables = {};


export type HasSetupQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hasSetup'>
);
