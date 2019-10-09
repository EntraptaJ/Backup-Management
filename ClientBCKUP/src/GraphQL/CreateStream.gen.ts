import * as Types from '../graphqlTypes.gen';


import gql from 'graphql-tag';

export const CreateStream = gql`
    mutation CreateStream($clientToken: String!) {
  createStream(clientToken: $clientToken) {
    id
  }
}
    `;
export type CreateStreamMutationVariables = {
  clientToken: Types.Scalars['String']
};


export type CreateStreamMutation = (
  { __typename?: 'Mutation' }
  & { createStream: (
    { __typename?: 'Stream' }
    & Pick<Types.Stream, 'id'>
  ) }
);
