import * as Types from '../graphqlTypes.gen';


import gql from 'graphql-tag';

export const PushStream = gql`
    mutation PushStream($streamId: ID!, $chunk: String!, $clientToken: String!) {
  pushStream(streamId: $streamId, clientToken: $clientToken, chunk: $chunk)
}
    `;
export type PushStreamMutationVariables = {
  streamId: Types.Scalars['ID'],
  chunk: Types.Scalars['String'],
  clientToken: Types.Scalars['String']
};


export type PushStreamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'pushStream'>
);
