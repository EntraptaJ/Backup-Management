import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const DeleteScheduleDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scheduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scheduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scheduleId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"schedules"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"time"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type DeleteScheduleMutationFn = ApolloReactCommon.MutationFunction<DeleteScheduleMutation, DeleteScheduleMutationVariables>;

    export function useDeleteScheduleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteScheduleMutation, DeleteScheduleMutationVariables>) {
      return ApolloReactHooks.useMutation<DeleteScheduleMutation, DeleteScheduleMutationVariables>(DeleteScheduleDocument, baseOptions);
    }
export type DeleteScheduleMutationHookResult = ReturnType<typeof useDeleteScheduleMutation>;
export type DeleteScheduleMutationResult = ApolloReactCommon.MutationResult<DeleteScheduleMutation>;
export type DeleteScheduleMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteScheduleMutation, DeleteScheduleMutationVariables>;export type DeleteScheduleMutationVariables = {
  scheduleId: Types.Scalars['ID']
};


export type DeleteScheduleMutation = (
  { __typename?: 'Mutation' }
  & { deleteSchedule: (
    { __typename?: 'Client' }
    & Pick<Types.Client, 'id' | 'path'>
    & { schedules: Array<(
      { __typename?: 'Schedule' }
      & Pick<Types.Schedule, 'id' | 'createdAt' | 'updatedAt' | 'time'>
    )> }
  ) }
);
