import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const DeleteClientDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clients"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"folderSize"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type DeleteClientMutationFn = ApolloReactCommon.MutationFunction<DeleteClientMutation, DeleteClientMutationVariables>;

    export function useDeleteClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteClientMutation, DeleteClientMutationVariables>) {
      return ApolloReactHooks.useMutation<DeleteClientMutation, DeleteClientMutationVariables>(DeleteClientDocument, baseOptions);
    }
export type DeleteClientMutationHookResult = ReturnType<typeof useDeleteClientMutation>;
export type DeleteClientMutationResult = ApolloReactCommon.MutationResult<DeleteClientMutation>;
export type DeleteClientMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteClientMutation, DeleteClientMutationVariables>;export type DeleteClientMutationVariables = {
  clientId: Types.Scalars['ID']
};


export type DeleteClientMutation = (
  { __typename?: 'Mutation' }
  & { deleteClient: (
    { __typename?: 'Service' }
    & Pick<Types.Service, 'id' | 'name'>
    & { clients: Array<Types.Maybe<(
      { __typename?: 'Client' }
      & Pick<Types.Client, 'id' | 'path' | 'folderSize'>
    )>> }
  ) }
);
