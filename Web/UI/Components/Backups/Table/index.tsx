// Web/UI/Components/Backups/Table/index.tsx
import { ChangeSet, EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableEditColumn,
  TableEditRow,
  TableHeaderRow,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
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
            { name: 'createdAt', title: 'Creation Date' },
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
