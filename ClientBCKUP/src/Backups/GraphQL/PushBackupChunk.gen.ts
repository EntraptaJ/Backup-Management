import * as Types from '../../graphqlTypes.gen';


import gql from 'graphql-tag';

export const PushBackupChunk = gql`
    mutation PushBackupChunk($backupId: ID!, $chunk: String!) {
  pushBackupChunk(backupId: $backupId, chunk: $chunk)
}
    `;
export type PushBackupChunkMutationVariables = {
  backupId: Types.Scalars['ID'],
  chunk: Types.Scalars['String']
};


export type PushBackupChunkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'pushBackupChunk'>
);
