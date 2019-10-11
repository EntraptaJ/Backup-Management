import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const CreateClientDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClientInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clients"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"folderSize"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type CreateClientMutationFn = ApolloReactCommon.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

    export function useCreateClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, baseOptions);
    }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = ApolloReactCommon.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;export type CreateClientMutationVariables = {
  serviceId: Types.Scalars['ID'],
  input: Types.CreateClientInput
};


export type CreateClientMutation = (
  { __typename?: 'Mutation' }
  & { createClient: (
    { __typename?: 'Service' }
    & Pick<Types.Service, 'id' | 'name'>
    & { clients: Array<Types.Maybe<(
      { __typename?: 'Client' }
      & Pick<Types.Client, 'id' | 'path' | 'folderSize'>
    )>> }
  ) }
);
