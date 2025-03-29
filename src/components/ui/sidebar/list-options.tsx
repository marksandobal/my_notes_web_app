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
  button: boolean;
  function?: () => void;
  icon: JSX.Element;
}

interface ListOptionsProps {
  open: boolean;
  options: Array<OptionItem>;
}

const ListOptions = ({ open, options }: ListOptionsProps) => {
  const buttonStyle = [
    { minHeight: 48, px: 2.5 },
    open ? { justifyContent: 'initial', } : { justifyContent: 'center' }
  ];

  const itemIconStyle = [
    { minWidth: 0, justifyContent: 'center', color: 'white' },
    open ? { mr: 3, } : {  mr: 'auto', },
  ];

  const listItemTextStyle = [ open ? { opacity: 1, } : { opacity: 0, } ];

  const customListItemButtom = (option: OptionItem) =>{
    if(option.button) {
      return (
        <ListItemButton
        onClick={option.function}
        sx={buttonStyle}
      >
        <ListItemIcon
          sx={itemIconStyle}
        >
          {option.icon ? option.icon : <MailIcon />}
        </ListItemIcon>
        <ListItemText
          primary={option.option}
          sx={listItemTextStyle}
        />
      </ListItemButton>
      )
    } else {
      return (
        <ListItemButton
        sx={buttonStyle}
      >
        <ListItemIcon
          sx={itemIconStyle}
        >
          {option.icon ? option.icon : <MailIcon />}
        </ListItemIcon>
        <ListItemText
          primary={option.option}
          sx={listItemTextStyle}
        />
      </ListItemButton>
      )
    }
  };

  return (
    <List>
    {options.map((item, index) => (
      <ListItem key={index} disablePadding sx={{ display: 'block' }}>
        {customListItemButtom(item)}
      </ListItem>
    ))}
  </List>
  );
};

export default ListOptions;
