import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const ServiceDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Service"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"service"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"clients"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[],"directives":[]}]}}]}}]}}]};

    export function useServiceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ServiceQuery, ServiceQueryVariables>) {
      return ApolloReactHooks.useQuery<ServiceQuery, ServiceQueryVariables>(ServiceDocument, baseOptions);
    }
      export function useServiceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServiceQuery, ServiceQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ServiceQuery, ServiceQueryVariables>(ServiceDocument, baseOptions);
      }
      
export type ServiceQueryHookResult = ReturnType<typeof useServiceQuery>;
export type ServiceQueryResult = ApolloReactCommon.QueryResult<ServiceQuery, ServiceQueryVariables>;export type ServiceQueryVariables = {
  serviceId: Types.Scalars['ID']
};


export type ServiceQuery = (
  { __typename?: 'Query' }
  & { service: (
    { __typename?: 'Service' }
    & Pick<Types.Service, 'id' | 'name'>
    & { clients: Array<Types.Maybe<(
      { __typename?: 'Client' }
      & Pick<Types.Client, 'id' | 'path'>
    )>> }
  ) }
);
