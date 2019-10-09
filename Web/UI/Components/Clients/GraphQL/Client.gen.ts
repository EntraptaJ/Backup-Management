import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const ClientDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Client"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"client"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"backups"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"state"},"arguments":[],"directives":[]}]}}]}}]}}]};

    export function useClientQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ClientQuery, ClientQueryVariables>) {
      return ApolloReactHooks.useQuery<ClientQuery, ClientQueryVariables>(ClientDocument, baseOptions);
    }
      export function useClientLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClientQuery, ClientQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ClientQuery, ClientQueryVariables>(ClientDocument, baseOptions);
      }
      
export type ClientQueryHookResult = ReturnType<typeof useClientQuery>;
export type ClientQueryResult = ApolloReactCommon.QueryResult<ClientQuery, ClientQueryVariables>;export type ClientQueryVariables = {
  clientId: Types.Scalars['ID']
};


export type ClientQuery = (
  { __typename?: 'Query' }
  & { client: (
    { __typename?: 'Client' }
    & Pick<Types.Client, 'path' | 'id'>
    & { backups: Array<(
      { __typename?: 'Backup' }
      & Pick<Types.Backup, 'id' | 'updatedAt' | 'createdAt' | 'state'>
    )> }
  ) }
);
