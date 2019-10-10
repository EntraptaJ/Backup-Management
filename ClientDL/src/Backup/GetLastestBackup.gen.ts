import * as Types from '../graphqlTypes.gen';


import gql from 'graphql-tag';

export const GetLatestBackup = gql`
    subscription GetLatestBackup($clientToken: String!) {
  getLatestBackup(clientToken: $clientToken)
}
    `;
export type GetLatestBackupSubscriptionVariables = {
  clientToken: Types.Scalars['String']
};


export type GetLatestBackupSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Types.Subscription, 'getLatestBackup'>
);
