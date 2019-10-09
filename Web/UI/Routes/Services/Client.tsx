// Web/UI/Routes/Services/Client.tsx
import React from 'react';
import { useParams, Redirect } from 'react-router';
import { ClientPage } from 'UI/Components/Clients';

interface ClientRouteParams {
  serviceId: string;
  clientId: string;
}

export default function ClientRoute(): React.ReactElement {
  const params = useParams<ClientRouteParams>();

  if (!params.serviceId || !params.clientId) return <Redirect to='/Services' />;
  else return <ClientPage {...params} />;
}
