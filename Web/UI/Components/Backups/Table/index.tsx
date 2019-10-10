// Web/UI/Components/Backups/Table/index.tsx
import { ChangeSet, EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableEditColumn,
  TableEditRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import { format } from 'date-fns';
import React, { useCallback } from 'react';
import { Backup } from 'UI/GraphQL/graphqlTypes.gen';
import { Command } from '../../Services/Table/Command';
import { useDeleteBackupMutation } from '../GraphQL/DeleteBackup.gen';
import { useSnackbar } from 'notistack';
import { useStartBackupMutation } from 'UI/Components/Clients/GraphQL/CreateBackup.gen';
import { BaseButton } from 'UI/Components/Styles/Button/BaseButton';
import prettyByte from 'pretty-bytes';

interface BackupTableProps {
  backups?: Pick<Backup, 'id' | 'updatedAt' | 'createdAt' | 'state'>[];
  clientId: string;
}

export function BackupTable({
  backups,
  clientId,
}: BackupTableProps): React.ReactElement {
  const [startBackup] = useStartBackupMutation({ variables: { clientId } });
  const [deleteBackup] = useDeleteBackupMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleChanges = useCallback(
    async ({ deleted }: ChangeSet) => {
      if (deleted)
        for (const backupId of deleted as string[]) {
          const response = await deleteBackup({ variables: { backupId } });
          if (response.data?.deleteBackup)
            enqueueSnackbar('Backup Deleted Successfully', {
              variant: 'success',
            });
        }
    },
    [deleteBackup, enqueueSnackbar],
  );

  const handleStartBackupClick = useCallback(async () => {
    const response = await startBackup();
    if (response.data?.emitClientEvent)
      enqueueSnackbar('Backup Started Successfully', { variant: 'success' });
  }, [startBackup, enqueueSnackbar]);

  return (
    <>
      <Paper style={{ margin: '1em' }}>
        <BaseButton label='Start Backup' onClick={handleStartBackupClick} />
        <Grid
          rows={backups || []}
          getRowId={({ id }) => id}
          columns={[
            {
              name: 'createdAt',
              title: 'Creation Date',
              getCellValue: ({ createdAt }, a, b) =>
                format(new Date(createdAt || ''), 'EEEE, MMMM do, hh:mm a'),
            },
            { name: 'state', title: 'State' },
            {
              name: 'fileSize',
              title: 'File Size',
              getCellValue: ({ fileSize }) => prettyByte(fileSize),
            },
          ]}
        >
          <EditingState onCommitChanges={handleChanges} />
          <Table />
          <TableEditRow />
          <TableEditColumn
            showEditCommand={false}
            showDeleteCommand={true}
            commandComponent={Command((a, t) => () => t())}
          />
        </Grid>
      </Paper>
    </>
  );
}
