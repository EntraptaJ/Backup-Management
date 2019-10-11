// Web/UI/Components/Backups/Table/index.tsx
import { format } from 'date-fns-tz';
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';
import prettyByte from 'pretty-bytes';
import React, { useCallback } from 'react';
import { useStartBackupMutation } from 'UI/Components/Clients/GraphQL/CreateBackup.gen';
import { Backup } from 'UI/GraphQL/graphqlTypes.gen';
import { useDeleteBackupMutation } from '../GraphQL/DeleteBackup.gen';
import { ApolloQueryResult } from 'apollo-client';
import { ClientQuery, ClientQueryVariables } from 'UI/Components/Clients/GraphQL/Client.gen';

type BackupData = Pick<
  Backup,
  'id' | 'updatedAt' | 'createdAt' | 'state' | 'fileSize'
>;

interface BackupTableProps {
  backups?: BackupData[];
  clientId: string;
  refetch: (variables?: ClientQueryVariables) => Promise<ApolloQueryResult<ClientQuery>>
}

export function BackupTable({
  backups,
  clientId,
  refetch,
}: BackupTableProps): React.ReactElement {
  const [startBackup] = useStartBackupMutation({ variables: { clientId } });
  const [deleteBackup] = useDeleteBackupMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBackup = useCallback(async ({ id }) => {
    const response = await deleteBackup({ variables: { backupId: id } })
    if (response && response.data) enqueueSnackbar('Backup Deleted Successfully', { variant: 'success' })
  }, [deleteBackup, enqueueSnackbar]);

  /*
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
  ); */ 

  const handleStartBackup = useCallback(async () => {
    const response = await startBackup();
    if (response.data?.emitClientEvent)
      enqueueSnackbar('Backup Started Successfully', { variant: 'success' });
  }, [startBackup, enqueueSnackbar]);

  return (
    <>
      <MaterialTable
        title='Backups'
        style={{ margin: '1em' }}
        columns={[
          {
            title: 'Date',
            field: 'createdAt',
            editable: 'never',
            render: (data) =>
              data
                ? format(
                    new Date(data.createdAt || ''),
                    'EEEE, MMMM do, hh:mm a',
                  )
                : undefined,
          },
          {
            title: 'Status',
            field: 'state',
            editable: 'never',
          },
          {
            title: 'Size',
            field: 'fileSize',
            render: (data) => (data ? prettyByte(data.fileSize) : 0),
            editable: 'never',
          },
        ]}
        data={backups || ([] as BackupData[])}
        editable={{
          onRowDelete: handleDeleteBackup,
        }}
        actions={[
          {
            icon: 'add',
            tooltip: 'Start backup',
            isFreeAction: true,
            onClick: handleStartBackup,
          },
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
