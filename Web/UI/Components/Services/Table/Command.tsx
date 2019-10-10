/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// UI/UI/Components/Zone/Table/Command.tsx
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import { CommandButton } from './Commands/CommandButton';

export type CommandType = 'add' | 'edit' | 'commit' | 'delete' | 'cancel';

interface CommandProps {
  id: CommandType;
  onExecute: () => any;
}

interface CommandItem {
  icon: React.ReactElement;
  title: string;
}

const Commands: { [item in CommandType]: CommandItem } = {
  edit: { icon: <EditIcon />, title: 'Edit Row' },
  add: { icon: <AddIcon />, title: 'Add Row' },
  commit: { icon: <SaveIcon />, title: 'Commit Changes' },
  cancel: { icon: <CancelIcon />, title: 'Cancel' },
  delete: { icon: <DeleteIcon />, title: 'Delete row' },
};

export type OnSelect = (type: CommandType, onExec: () => void) => () => void;

export const Command = (
  onClick: OnSelect,
): ((props: CommandProps) => React.ReactElement) => ({ id, onExecute }) => (
  <CommandButton
    icon={Commands[id].icon}
    onClick={onClick(id, onExecute)}
    title={Commands[id].title}
  />
);
