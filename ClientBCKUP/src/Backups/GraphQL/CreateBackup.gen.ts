import * as Types from '../../graphqlTypes.gen';


import gql from 'graphql-tag';

export const CreateBackup = gql`
    mutation CreateBackup($clientToken: String!) {
  createBackup(clientToken: $clientToken) {
    id
    state
    client {
      path
      id
    }
  }
}
    `;
export type CreateBackupMutationVariables = {
  clientToken: Types.Scalars['String']
};


export type CreateBackupMutation = (
  { __typename?: 'Mutation' }
  & { createBackup: (
    { __typename?: 'Backup' }
    & Pick<Types.Backup, 'id' | 'state'>
    & { client: (
      { __typename?: 'Client' }
      & Pick<Types.Client, 'path' | 'id'>
    ) }
  ) }
);
