import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const CreateScheduleDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateScheduleInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"schedules"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"time"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type CreateScheduleMutationFn = ApolloReactCommon.MutationFunction<CreateScheduleMutation, CreateScheduleMutationVariables>;

    export function useCreateScheduleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateScheduleMutation, CreateScheduleMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateScheduleMutation, CreateScheduleMutationVariables>(CreateScheduleDocument, baseOptions);
    }
export type CreateScheduleMutationHookResult = ReturnType<typeof useCreateScheduleMutation>;
export type CreateScheduleMutationResult = ApolloReactCommon.MutationResult<CreateScheduleMutation>;
export type CreateScheduleMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateScheduleMutation, CreateScheduleMutationVariables>;export type CreateScheduleMutationVariables = {
  clientId: Types.Scalars['ID'],
  input: Types.CreateScheduleInput
};


export type CreateScheduleMutation = (
  { __typename?: 'Mutation' }
  & { createSchedule: (
    { __typename?: 'Client' }
    & Pick<Types.Client, 'id' | 'path'>
    & { schedules: Array<(
      { __typename?: 'Schedule' }
      & Pick<Types.Schedule, 'id' | 'createdAt' | 'updatedAt' | 'time'>
    )> }
  ) }
);
