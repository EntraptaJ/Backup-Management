// Web/UI/Components/Services/Table/index.tsx
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';
import prettyByte from 'pretty-bytes';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useCreateServiceMutation } from 'UI/Components/Service/GraphQL/CreateService.gen';
import { useDeleteServiceMutation } from 'UI/Components/Service/GraphQL/DeleteService.gen';
import { Service, ServiceInput } from 'UI/GraphQL/graphqlTypes.gen';
import { useServicesQuery } from '../GraphQL/Services.gen';


type RowClick<T> = (
  event?: React.MouseEvent,
  rowData?: T,
  toggleDetailPanel?: (panelIndex?: number) => void,
) => void;

type ServiceData = Pick<Service, 'id' | 'name' | 'totalSize'>;

export function ServicesTable(): React.ReactElement {
  const { data, refetch } = useServicesQuery();
  const [createService] = useCreateServiceMutation();
  const [deleteService] = useDeleteServiceMutation()
  const history = useHistory()

  const { enqueueSnackbar } = useSnackbar();

  const handleRowClick: RowClick<ServiceData> = useCallback(
    (a, rowData) => rowData && history.push(`/Services/${rowData.id}`),
    [history],
  );

  const handleCreateService = useCallback(
    async (input: ServiceInput) => {
      const response = await createService({ variables: { input } });
      if (response.data && response.data.createService) {
        enqueueSnackbar('Service Created', { variant: 'success' });
      }
    },
    [createService, enqueueSnackbar],
  );

  const handleDeleteService = useCallback(async ({ id }) => {
    const response = await deleteService({ variables: { serviceId: id } })
    if (response.data?.deleteService) enqueueSnackbar('Service deleted successfully', { variant: 'success' })
  }, [deleteService, enqueueSnackbar])

  return (
    <>
      <MaterialTable
        title='Services'
        onRowClick={handleRowClick}
        style={{ margin: '1em' }}
        columns={      [
          { title: 'Name', field: 'name' },
          {
            title: 'Size',
            field: 'totalSize',
            render: (data) => (data ? prettyByte(data.totalSize) : 0),
            editable: 'never',
          },
        ]}
        data={data?.currentUser?.services || [] as ServiceData[]}
        editable={{
          onRowAdd: handleCreateService,
          onRowDelete: handleDeleteService,
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
