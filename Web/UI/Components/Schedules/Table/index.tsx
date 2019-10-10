// Web/UI/Components/Schedules/Table/index.tsx
import { ChangeSet, EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableEditColumn,
  TableEditRow,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import React, { useCallback } from 'react';
import { CreateScheduleInput, Schedule } from 'UI/GraphQL/graphqlTypes.gen';
import { Command } from '../../Services/Table/Command';
import { useCreateScheduleMutation } from '../GraphQL/CreateSchedule.gen';
import { format } from 'date-fns-tz';

interface ScheduleTableProps {
  schedules?: Pick<Schedule, 'id' | 'createdAt' | 'time' | 'updatedAt'>[];
  clientId: string;
}

export function ScheduleTable({
  schedules,
  clientId,
}: ScheduleTableProps): React.ReactElement {
  const [createSchedule] = useCreateScheduleMutation();

  const handleChanges = useCallback(
    async ({ deleted, added }: ChangeSet) => {
      if (added)
        for (const input of added as CreateScheduleInput[])
          await createSchedule({ variables: { clientId, input } });
    },
    [createSchedule, clientId],
  );
  
  return (
    <>
      <Paper style={{ margin: '1em' }}>
        <Grid
          rows={schedules || []}
          columns={[
            {
              name: 'createdAt',
              title: 'Creation Date',
              getCellValue: ({ createdAt }, a, b) =>
                createdAt?.length > 3
                  ? format(new Date(createdAt), 'EEEE, MMMM do, hh:mm a', { timeZone: 'America/Winnipeg' })
                  : undefined,
            },
            {
              name: 'time',
              title: 'Run Time',
            },
          ]}
        >
          <EditingState
            onCommitChanges={handleChanges}
            columnExtensions={[
              { columnName: 'createdAt', editingEnabled: false },
            ]}
          />
          <Table />
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
