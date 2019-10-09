// Web/UI/Routes/Services/Service.tsx
import React from 'react';
import { useParams, Redirect } from 'react-router';
import { ServicesPage } from 'UI/Components/Service';

interface ServiceRouteParams {
  serviceId?: string;
}

export default function ServiceRoute(): React.ReactElement {
  const { serviceId } = useParams<ServiceRouteParams>();

  if (!serviceId) return <Redirect to='/Services' />;
  else return <ServicesPage serviceId={serviceId} />;
}
