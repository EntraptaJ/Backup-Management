// Web/UI/Components/Clients/index.tsx
import React from 'react';
import { useClientQuery } from './GraphQL/Client.gen';
import { Header } from '../Styles/Header';
import { BackupTable } from '../Backups/Table';

interface ClientPageProps {
  serviceId: string;
  clientId: string;
}

export function ClientPage({ clientId }: ClientPageProps): React.ReactElement {
  const { data } = useClientQuery({ variables: { clientId } });

  return (
    <>
      <Header title={{ primary: `Client Settings` }} />
      <BackupTable backups={data?.client.backups} clientId={clientId} />
    </>
  );
}
