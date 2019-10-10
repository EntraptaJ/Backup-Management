// Web/UI/Components/Service/index.tsx
import React, { useCallback } from 'react';
import { useServiceQuery } from './GraphQL/Service.gen';
import { Header } from '../Styles/Header';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import { Command } from '../Services/Table/Command';
import { TableRow } from './Row';
import { EditingState, ChangeSet } from '@devexpress/dx-react-grid';
import { useCreateClientMutation } from '../Clients/GraphQL/CreateClient.gen';
import { CreateClientInput } from 'UI/GraphQL/graphqlTypes.gen';
import { useSnackbar } from 'notistack';
import prettyByte from 'pretty-bytes';

interface ServicePageProps {
  serviceId: string;
}

export function ServicesPage({
  serviceId,
}: ServicePageProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useServiceQuery({ variables: { serviceId } });
  const [createClient] = useCreateClientMutation();

  const handleChanges = useCallback(
    async ({ added }: ChangeSet) => {
      if (added)
        for (const input of added as CreateClientInput[]) {
          const result = await createClient({
            variables: { input, serviceId },
          });
          if (result.data?.createClient) {
            enqueueSnackbar('Successfully added service', {
              variant: 'success',
            });
          }
        }
    },
    [serviceId, enqueueSnackbar, createClient],
  );

  return (
    <>
      <Header title={{ primary: data?.service.name || 'Service' }} />
      <Paper style={{ margin: '1em' }}>
        <Grid
          rows={data?.service.clients || []}
          columns={[
            { name: 'path', title: 'Path' },
            {
              name: 'folderSize',
              title: 'Size',
              getCellValue: ({ folderSize }) =>
                folderSize ? prettyByte(folderSize) : 0,
            },
          ]}
        >
          <EditingState
            onCommitChanges={handleChanges}
            columnExtensions={[
              { columnName: 'folderSize', editingEnabled: false },
            ]}
          />
          <Table rowComponent={TableRow} />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            showAddCommand={true}
            showEditCommand={false}
            showDeleteCommand={true}
            commandComponent={Command((a, t) => () => t())}
          />
        </Grid>
      </Paper>
    </>
  );
}
