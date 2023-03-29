import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from "react-redux";
import {
  getSidebarStatus,
  setSidebarOn,
  setSidebarOff,
} from "../../store/sidebarSlice";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);

  let items = [
    { id: 0, name: "All Products", path: "/", icon: <CategoryIcon /> },
    { id: 1, name: "Create Product", path: "/addProducts", icon: <AddIcon /> },
    // { id: 2, name: "Send Email ", path: "home", icon: <InboxIcon /> },
    // { id: 3, name: "Drafts", path: "home", icon: <MailIcon /> },
  ];

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {items.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Link to={item.path}>
            <ListItemButton sx={{ color: "grey" }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        open={isSidebarOn}
        onClose={() => dispatch(setSidebarOff())}
        onOpen={() => dispatch(setSidebarOn())}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
