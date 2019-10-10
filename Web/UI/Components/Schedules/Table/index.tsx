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
import { useSnackbar } from 'notistack';
import { useUpdateScheduleMutation } from '../GraphQL/UpdateSchedule.gen';

interface ScheduleTableProps {
  schedules?: Pick<Schedule, 'id' | 'createdAt' | 'time' | 'updatedAt'>[];
  clientId: string;
}

export function ScheduleTable({
  schedules,
  clientId,
}: ScheduleTableProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [createSchedule] = useCreateScheduleMutation();
  const [updateSchedule] = useUpdateScheduleMutation();

  const handleChanges = useCallback(
    async ({ deleted, added, changed }: ChangeSet) => {
      if (deleted)
        for (const scheduleId of deleted as string[]) {
          const response = await updateSchedule({ variables: { scheduleId } });
          if (response.data?.updateSchedule)
            enqueueSnackbar('Schedule deleted successfully', {
              variant: 'success',
            });
        }
      if (changed)
        for (const scheduleId in changed) {
          const response = await updateSchedule({
            variables: { scheduleId, update: changed[scheduleId] },
          });
          if (response.data?.updateSchedule)
            enqueueSnackbar('Schedule updated successfully', {
              variant: 'success',
            });
        }
      if (added)
        for (const input of added as CreateScheduleInput[]) {
          const response = await createSchedule({
            variables: { clientId, input },
          });
          if (response.data?.createSchedule)
            enqueueSnackbar('Schedule created successfully', {
              variant: 'success',
            });
        }
    },
    [createSchedule, clientId, updateSchedule, enqueueSnackbar],
  );

  return (
    <>
      <Paper style={{ margin: '1em' }}>
        <Grid
          rows={schedules || []}
          getRowId={({ id }) => id}
          columns={[
            {
              name: 'createdAt',
              title: 'Creation Date',
              getCellValue: ({ createdAt }, a, b) =>
                createdAt?.length > 3
                  ? format(new Date(createdAt), 'EEEE, MMMM do, hh:mm a', {
                      timeZone: 'America/Winnipeg',
                    })
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
            showEditCommand={true}
            showDeleteCommand={true}
            commandComponent={Command((a, t) => () => t())}
          />
        </Grid>
      </Paper>
    </>
  );
}
