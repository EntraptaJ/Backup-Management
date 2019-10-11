// Web/UI/Components/Schedules/Table/index.tsx
import { format } from 'date-fns-tz';
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { Schedule } from 'UI/GraphQL/graphqlTypes.gen';
import { useCreateScheduleMutation } from '../GraphQL/CreateSchedule.gen';
import { useDeleteScheduleMutation } from '../GraphQL/DeleteSchedule.gen';
import { useUpdateScheduleMutation } from '../GraphQL/UpdateSchedule.gen';
import DateFnsUtils from '@date-io/date-fns';
import { parse } from 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

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
  const [deleteSchedule] = useDeleteScheduleMutation();

  const handleCreateSchedules = useCallback(
    async (input: { time: string }) => {
      const response = await createSchedule({
        variables: {
          input: {
            time: format(parse(input.time, 'HH:mm:ss', new Date()), 'HH:mm'),
          },
          clientId,
        },
      });
      if (response.data?.createSchedule)
        enqueueSnackbar('Successfully created schedule', {
          variant: 'success',
        });
    },
    [clientId, createSchedule, enqueueSnackbar],
  );

  const handleDeleteSchedule = useCallback(
    async ({ id }) => {
      const response = await deleteSchedule({ variables: { scheduleId: id } });
      if (response.data?.deleteSchedule)
        enqueueSnackbar('Schedule deleted successfully', {
          variant: 'success',
        });
    },
    [deleteSchedule, enqueueSnackbar],
  );

  const handleUpdateSchedule = useCallback(
    async ({ time, id }) => {
      const response = await updateSchedule({
        variables: { update: { time: time }, scheduleId: id },
      });
      if (response.data?.updateSchedule)
        enqueueSnackbar('Successfully created schedule', {
          variant: 'success',
        });
    },
    [updateSchedule, enqueueSnackbar],
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MaterialTable
        title='Schedules'
        style={{ margin: '1em' }}
        columns={[
          {
            title: 'Date',
            field: 'createdAt',
            editable: 'never',
            render: (data) =>
              data && data.updatedAt
                ? format(
                    new Date(data.createdAt || ''),
                    'EEEE, MMMM do, hh:mm a',
                  )
                : undefined,
          },
          {
            title: 'Backup Time',
            field: 'time',
            // eslint-disable-next-line react/display-name
            editComponent: ({ value, onChange, ...props }) => (
              <KeyboardTimePicker
                label='Time'
                openTo='hours'
                views={['hours', 'minutes']}
                minutesStep={15}
                value={
                  typeof value === 'string'
                    ? parse(value, 'HH:mm:ss', new Date())
                    : value || new Date('2019-10-11T05:00:00.974Z')
                }
                onChange={(value) =>
                  onChange(format(value as Date, 'HH:mm:ss'))
                }
                {...props}
              />
            ),
            render: (data) =>
              data
                ? format(parse(data.time, 'HH:mm:ss', new Date()), 'hh:mm a')
                : '12:00 AM',
          },
        ]}
        data={schedules || []}
        editable={{
          onRowAdd: handleCreateSchedules,
          onRowDelete: handleDeleteSchedule,
          onRowUpdate: handleUpdateSchedule,
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
