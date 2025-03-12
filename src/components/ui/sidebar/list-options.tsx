'use client'

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText
} from '@mui/material';
import {
  Inbox as InboxIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import { JSX } from '@emotion/react/jsx-runtime';

interface OptionItem {
  option: string;
  icon: JSX.Element;
}

interface ListOptionsProps {
  open: boolean;
  options: Array<OptionItem>;
}

const ListOptions = ({ open, options }: ListOptionsProps) => {
  return (
    <List>
    {options.map((item, index) => (
      <ListItem key={index} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={[
            {
              minHeight: 48,
              px: 2.5,
            },
            open
              ? {
                  justifyContent: 'initial',
                }
              : {
                  justifyContent: 'center',
                },
          ]}
        >
          <ListItemIcon
            sx={[
              {
                minWidth: 0,
                justifyContent: 'center',
                color: 'white'
              },
              open
                ? {
                    mr: 3,
                  }
                : {
                    mr: 'auto',
                  },
            ]}
          >
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText
            primary={item.option}
            sx={[
              open
                ? {
                    opacity: 1,
                  }
                : {
                    opacity: 0,
                  },
            ]}
          />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
  );
};

export default ListOptions;
