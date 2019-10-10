import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const StartBackupDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartBackup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emitClientEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"backups"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"state"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type StartBackupMutationFn = ApolloReactCommon.MutationFunction<StartBackupMutation, StartBackupMutationVariables>;

    export function useStartBackupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StartBackupMutation, StartBackupMutationVariables>) {
      return ApolloReactHooks.useMutation<StartBackupMutation, StartBackupMutationVariables>(StartBackupDocument, baseOptions);
    }
export type StartBackupMutationHookResult = ReturnType<typeof useStartBackupMutation>;
export type StartBackupMutationResult = ApolloReactCommon.MutationResult<StartBackupMutation>;
export type StartBackupMutationOptions = ApolloReactCommon.BaseMutationOptions<StartBackupMutation, StartBackupMutationVariables>;export type StartBackupMutationVariables = {
  clientId: Types.Scalars['ID']
};


export type StartBackupMutation = (
  { __typename?: 'Mutation' }
  & { emitClientEvent: (
    { __typename?: 'Client' }
    & Pick<Types.Client, 'id' | 'path'>
    & { backups: Array<(
      { __typename?: 'Backup' }
      & Pick<Types.Backup, 'id' | 'updatedAt' | 'createdAt' | 'state' | 'fileSize'>
    )> }
  ) }
);
