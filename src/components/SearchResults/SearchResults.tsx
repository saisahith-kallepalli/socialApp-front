import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'

type Props = {}

const SearchResults = (props: Props) => {
    const person = "https://mui.com/static/images/avatar/1.jpg";
    const primary = "React";
    const secondary= "MUI"; 
  return (
    <ListItem button={true}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
  )
}

export default SearchResults