import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const ServicesDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Services"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"services"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]};

    export function useServicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
      return ApolloReactHooks.useQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, baseOptions);
    }
      export function useServicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, baseOptions);
      }
      
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesQueryResult = ApolloReactCommon.QueryResult<ServicesQuery, ServicesQueryVariables>;export type ServicesQueryVariables = {};


export type ServicesQuery = (
  { __typename?: 'Query' }
  & { services: Array<(
    { __typename?: 'Service' }
    & Pick<Types.Service, 'id' | 'name'>
  )> }
);
