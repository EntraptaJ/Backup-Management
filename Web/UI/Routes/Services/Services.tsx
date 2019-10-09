// Web/UI/Routes/Services/Services.tsx
import React from 'react';
import { Header } from 'UI/Components/Styles/Header';
import { ServicesTable } from 'UI/Components/Services/Table';

export default function ServicesRoute(): React.ReactElement {
  return (
    <>
      <Header title={{ primary: 'Services' }} />
      <ServicesTable />
    </>
  );
}
