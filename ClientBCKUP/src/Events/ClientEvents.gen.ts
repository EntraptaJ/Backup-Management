import * as Types from '../graphqlTypes.gen';


import gql from 'graphql-tag';

export const ClientEvents = gql`
    subscription ClientEvents($clientToken: String!) {
  clientEvents(clientToken: $clientToken) {
    type
  }
}
    `;
export type ClientEventsSubscriptionVariables = {
  clientToken: Types.Scalars['String']
};


export type ClientEventsSubscription = (
  { __typename?: 'Subscription' }
  & { clientEvents: (
    { __typename?: 'ClientEvent' }
    & Pick<Types.ClientEvent, 'type'>
  ) }
);
