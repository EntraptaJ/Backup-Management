import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const DeleteBackupDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBackup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"backupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBackup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"backupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"backupId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"backups"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"state"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type DeleteBackupMutationFn = ApolloReactCommon.MutationFunction<DeleteBackupMutation, DeleteBackupMutationVariables>;

    export function useDeleteBackupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteBackupMutation, DeleteBackupMutationVariables>) {
      return ApolloReactHooks.useMutation<DeleteBackupMutation, DeleteBackupMutationVariables>(DeleteBackupDocument, baseOptions);
    }
export type DeleteBackupMutationHookResult = ReturnType<typeof useDeleteBackupMutation>;
export type DeleteBackupMutationResult = ApolloReactCommon.MutationResult<DeleteBackupMutation>;
export type DeleteBackupMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteBackupMutation, DeleteBackupMutationVariables>;export type DeleteBackupMutationVariables = {
  backupId: Types.Scalars['ID']
};


export type DeleteBackupMutation = (
  { __typename?: 'Mutation' }
  & { deleteBackup: (
    { __typename?: 'Client' }
    & Pick<Types.Client, 'path' | 'id'>
    & { backups: Array<(
      { __typename?: 'Backup' }
      & Pick<Types.Backup, 'createdAt' | 'state' | 'id'>
    )> }
  ) }
);
