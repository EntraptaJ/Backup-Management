// Web/UI/Components/Service/index.tsx
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { Client, ClientInput } from 'UI/GraphQL/graphqlTypes.gen';
import { useCreateClientMutation } from '../Clients/GraphQL/CreateClient.gen';
import { useDeleteClientMutation } from '../Clients/GraphQL/DeleteClient.gen';
import { Header } from '../Styles/Header';
import { useServiceQuery } from './GraphQL/Service.gen';
import prettyByte from 'pretty-bytes';

interface ServicePageProps {
  serviceId: string;
}

type ClientData = Pick<Client, 'id' | 'path' | 'folderSize'>;

type RowClick<T> = (
  event?: React.MouseEvent,
  rowData?: T,
  toggleDetailPanel?: (panelIndex?: number) => void,
) => void;

export function ServicesPage({
  serviceId,
}: ServicePageProps): React.ReactElement {
  const { data, refetch } = useServiceQuery({ variables: { serviceId } });
  const [createClient] = useCreateClientMutation();
  const [deleteClient] = useDeleteClientMutation()
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()

  const handleRowClick: RowClick<ClientData> = useCallback(
    (a, rowData) => rowData && history.push(`/Services/${serviceId}/${rowData.id}`),
    [history, serviceId],
  );

  const handleCreateClient = useCallback(
    async (input: ClientInput) => {
      const response = await createClient({ variables: { input, serviceId } });
      if (response.data && response.data.createClient) {
        enqueueSnackbar('Service Created', { variant: 'success' });
      }
    },
    [createClient, enqueueSnackbar, serviceId],
  );

  const handleDeleteClient = useCallback(async ({ id }) => {
    const response = await deleteClient({ variables: { clientId: id } })
    if (response.data?.deleteClient) enqueueSnackbar('Client deleted successfully', { variant: 'success' })
  }, [deleteClient, enqueueSnackbar])

  return (
    <>
      <Header title={{ primary: data?.service.name || 'Service' }} />
      <MaterialTable
        title='Clients'
        onRowClick={handleRowClick}
        style={{ margin: '1em' }}
        columns={      [
          { title: 'Path', field: 'path' },
          { title: 'Folder Size', field: 'folderSize', render: (data) => data ? prettyByte(data.folderSize) : 0 },
        ]}
        data={data?.service?.clients as ClientData[] || [] as ClientData[]}
        editable={{
          onRowAdd: handleCreateClient,
          onRowDelete: handleDeleteClient,
          onRowUpdate: async (test) => console.log(`Update: `, test),
        }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh',
            isFreeAction: true,
            onClick: () => refetch(),
          },
        ]}
      />
    </>
  );
}
