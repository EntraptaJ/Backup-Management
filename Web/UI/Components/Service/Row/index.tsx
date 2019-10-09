// Web/UI/Components/Backups/Table/Row/index.tsx
import React from 'react';
import { Table } from '@devexpress/dx-react-grid-material-ui';
import { Client } from 'UI/GraphQL/graphqlTypes.gen';
import { useHistory, useLocation } from 'react-router';

interface TableRowProps extends Omit<Table.DataRowProps, 'row'> {
  row: Pick<Client, 'id' | 'path'>;
}

export function TableRow({ row, ...props }: TableRowProps): React.ReactElement {
  const history = useHistory();
  const location = useLocation();

  return (
    <Table.Row
      row={row}
      hover
      onClick={() => history.push(`${location.pathname}/${row.id}`)}
      {...props}
    />
  );
}
