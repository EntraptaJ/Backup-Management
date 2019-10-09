// Web/UI/Components/Services/Table/index.tsx
import {
  Grid,
  Table,
  Toolbar,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import React, { useCallback } from 'react';
import { useServicesQuery } from '../GraphQL/Services.gen';
import { TableRow } from './Row';
import { Command, OnSelect } from './Command';
import { EditingState, ChangeSet } from '@devexpress/dx-react-grid';
import { useCreateServiceMutation } from 'UI/Components/Service/GraphQL/CreateService.gen';
import { CreateServiceInput } from 'UI/GraphQL/graphqlTypes.gen';
import { useSnackbar } from 'notistack';

export function ServicesTable(): React.ReactElement {
  const [createService] = useCreateServiceMutation()
  const { data, refetch } = useServicesQuery();
  const { enqueueSnackbar } = useSnackbar()

  const onSelect: OnSelect = (action, onExec) => () => {
    if (action === 'edit') {
    }
    if (action === 'cancel' || action === 'edit' || action === 'commit')
      return onExec();
    else if (action === 'add') {
      onExec();
    } else if (action === 'delete') {
      onExec();
    }
  };

  const handleChanges = useCallback(async ({ added }: ChangeSet) => {
    if (added) for (const input of added as CreateServiceInput[]) {
      const result = await createService({ variables: { input } })
      if (result.data?.createService) {
        await refetch()
        enqueueSnackbar('Successfully added service', { variant: 'success' }) 
      }
    }
  }, [])

  return (
    <Paper style={{ margin: '1em' }}>
      <Grid
        rows={data?.services || []}
        columns={[{ name: 'name', title: 'Name' }]}
      >
        <EditingState onCommitChanges={handleChanges} />
        <Table rowComponent={TableRow} />
        <Toolbar />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          showAddCommand={true}
          showEditCommand={false}
          showDeleteCommand={true}
          commandComponent={Command(onSelect)}
        />
      </Grid>
    </Paper>
  );
}
