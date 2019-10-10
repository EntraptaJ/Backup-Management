// Web/UI/Components/Clients/index.tsx
import React, { useCallback } from 'react';
import { useClientQuery } from './GraphQL/Client.gen';
import { Header } from '../Styles/Header';
import { BackupTable } from '../Backups/Table';
import { ScheduleTable } from '../Schedules/Table';
import { useGetClientTokenLazyQuery  } from './GraphQL/ClientToken.gen'
import Button from '@material-ui/core/Button'
import { BaseButton } from '../Styles/Button/BaseButton';

interface ClientPageProps {
  serviceId: string;
  clientId: string;
}

export function ClientPage({ clientId }: ClientPageProps): React.ReactElement {
  const { data } = useClientQuery({ variables: { clientId } });
  const [getClientToken, { data: clientTokenData }] = useGetClientTokenLazyQuery({ variables: { clientId } })

  const handleClientTokenClick = useCallback(() => getClientToken(), [getClientToken])

  return (
    <>
      <Header title={{ primary: `Client Settings` }}>
      {!clientTokenData && <BaseButton label='Get Token' onClick={handleClientTokenClick} /> }
      {clientTokenData && <div>{clientTokenData.getClientToken}</div>}
      </Header>
      
      <ScheduleTable schedules={data?.client.schedules} clientId={clientId} />
      <BackupTable backups={data?.client.backups} clientId={clientId} />

    </>
  );
}
