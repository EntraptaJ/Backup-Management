// Web/UI/Components/Backups/Table/Row/index.tsx
import React from 'react';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import { Service } from 'UI/GraphQL/graphqlTypes.gen';
import { useHistory } from 'react-router';

interface TableRowProps extends Omit<Table.DataRowProps, 'row'> {
  row: Pick<Service, 'id' | 'name'>;
}

export function TableRow({ row, ...props }: TableRowProps): React.ReactElement {
  const history = useHistory();

  return (
    <Table.Row
      row={row}
      hover
      onClick={() => history.push(`/Services/${row.id}`)}
      {...props}
    />
  );
}
