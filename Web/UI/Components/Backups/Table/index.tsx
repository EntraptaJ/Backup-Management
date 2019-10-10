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

interface BackupTableProps {
  backups?: Pick<Backup, 'id' | 'updatedAt' | 'createdAt' | 'state'>[];
  clientId: string;
}

export function BackupTable({ backups }: BackupTableProps): React.ReactElement {
  const handleChanges = useCallback(async ({ deleted }: ChangeSet) => {}, []);

  return (
    <>
      <Paper style={{ margin: '1em' }}>
        <Grid
          rows={backups || []}
          columns={[
            {
              name: 'createdAt',
              title: 'Creation Date',
              getCellValue: ({ createdAt }, a, b) =>
                format(new Date(createdAt), 'EEEE, MMMM do, hh:mm a'),
            },
            { name: 'state', title: 'State' },
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
