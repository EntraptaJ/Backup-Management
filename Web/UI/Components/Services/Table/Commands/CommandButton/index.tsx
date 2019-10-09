// UI/UI/Components/Table/Commands/CommandButton/index.tsx
import React from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';

interface CommandButtonProps extends IconButtonProps {
  title: string;
  icon: React.ReactElement;
}

export function CommandButton({ icon, ...props }: CommandButtonProps): React.ReactElement {
  return <IconButton {...props}>{icon}</IconButton>;
}
