import * as Types from '../../graphqlTypes.gen';


import gql from 'graphql-tag';

export const FinishBackup = gql`
    mutation FinishBackup($backupId: ID!) {
  finishBackup(backupId: $backupId) {
    id
    state
    client {
      path
      id
    }
  }
}
    `;
export type FinishBackupMutationVariables = {
  backupId: Types.Scalars['ID']
};


export type FinishBackupMutation = (
  { __typename?: 'Mutation' }
  & { finishBackup: (
    { __typename?: 'Backup' }
    & Pick<Types.Backup, 'id' | 'state'>
    & { client: (
      { __typename?: 'Client' }
      & Pick<Types.Client, 'path' | 'id'>
    ) }
  ) }
);
