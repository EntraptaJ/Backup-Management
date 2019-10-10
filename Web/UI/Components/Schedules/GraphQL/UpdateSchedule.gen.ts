import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const UpdateScheduleDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scheduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"update"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleInput"}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scheduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scheduleId"}}},{"kind":"Argument","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"update"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"schedules"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"time"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type UpdateScheduleMutationFn = ApolloReactCommon.MutationFunction<UpdateScheduleMutation, UpdateScheduleMutationVariables>;

    export function useUpdateScheduleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateScheduleMutation, UpdateScheduleMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateScheduleMutation, UpdateScheduleMutationVariables>(UpdateScheduleDocument, baseOptions);
    }
export type UpdateScheduleMutationHookResult = ReturnType<typeof useUpdateScheduleMutation>;
export type UpdateScheduleMutationResult = ApolloReactCommon.MutationResult<UpdateScheduleMutation>;
export type UpdateScheduleMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateScheduleMutation, UpdateScheduleMutationVariables>;export type UpdateScheduleMutationVariables = {
  scheduleId: Types.Scalars['ID'],
  update?: Types.Maybe<Types.ScheduleInput>
};


export type UpdateScheduleMutation = (
  { __typename?: 'Mutation' }
  & { updateSchedule: (
    { __typename?: 'Client' }
    & Pick<Types.Client, 'id' | 'path'>
    & { schedules: Array<(
      { __typename?: 'Schedule' }
      & Pick<Types.Schedule, 'id' | 'updatedAt' | 'time'>
    )> }
  ) }
);
