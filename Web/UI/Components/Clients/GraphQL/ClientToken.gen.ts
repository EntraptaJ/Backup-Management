import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const GetClientTokenDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClientToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getClientToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}}],"directives":[]}]}}]};

    export function useGetClientTokenQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetClientTokenQuery, GetClientTokenQueryVariables>) {
      return ApolloReactHooks.useQuery<GetClientTokenQuery, GetClientTokenQueryVariables>(GetClientTokenDocument, baseOptions);
    }
      export function useGetClientTokenLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientTokenQuery, GetClientTokenQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetClientTokenQuery, GetClientTokenQueryVariables>(GetClientTokenDocument, baseOptions);
      }
      
export type GetClientTokenQueryHookResult = ReturnType<typeof useGetClientTokenQuery>;
export type GetClientTokenQueryResult = ApolloReactCommon.QueryResult<GetClientTokenQuery, GetClientTokenQueryVariables>;export type GetClientTokenQueryVariables = {
  clientId: Types.Scalars['ID']
};


export type GetClientTokenQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'getClientToken'>
);
