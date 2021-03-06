import React from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
  ExitToApp,
  FolderOpenOutlined,
  FolderSharedOutlined,
  Notifications as NotificationsIcon
} from '@material-ui/icons'
import { NavLink as Link } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogTitle, Tooltip, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
// resist the temptation to make this like the rest of the action creators
// because of the potential of a circular dependency(auth/utils->api->auth/api->auth/redux/actions->auth->utils)
import { LOGOUT_ACTION } from '../apps/authentication'
import { action } from '../redux/utils'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1
      }
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 2),
      ...theme.mixins.toolbar
    },
    content: {
      padding: theme.spacing(3),
      // position: 'absolute',
      width: "100vw"
      // marginLeft: theme.spacing(7) + 1,
    },
    logoutButton: {
      marginTop: "auto"
    },
    selected: {
      color: theme.palette.primary.main
    }
  })
);

interface Props {
  children: any;
  logout: Function;
}

export const NavDrawer: React.FC<Props> = ({ children, logout }) => {
  console.log(logout);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          {open ? (
            <span>
              <Typography variant="h6" noWrap>
                Open Concept Lab
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Typography>
            </span>
          ) : (
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </div>
        <Divider component="hr" />
        <List component="div">
          <ListItem
            button
            dense={false}
            component={Link}
            exact
            activeClassName={classes.selected}
            to="/user/collections/"
            key="Your Dictionaries"
          >
            <Tooltip title="Your Dictionaries">
              <ListItemIcon className="list-item-icon">
                <FolderOpenOutlined />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Your Dictionaries" />
          </ListItem>
          <ListItem
            button
            dense={false}
            component={Link}
            exact
            activeClassName={classes.selected}
            to="/collections/"
            key="Public Dictionaries"
          >
            <Tooltip title="Public Dictionaries">
              <ListItemIcon className="list-item-icon">
                <FolderSharedOutlined />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Public Dictionaries" />
          </ListItem>
        </List>
        <Divider component="hr" />
        <List component="div">
          <ListItem
            button
            dense={false}
            component={Link}
            exact
            activeClassName={classes.selected}
            to="/actions/"
            key="Progress Notifications"
          >
            <Tooltip title="Progress Notifications">
              <ListItemIcon className="list-item-icon">
                <NotificationsIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Progress Notifications" />
          </ListItem>
        </List>
        <Divider component="hr" />
        <div className={classes.logoutButton}>
          <Divider component="hr" />
          <List component="div">
            <ListItem
              onClick={() => setConfirmLogoutOpen(true)}
              button
              component="div"
              key={"Logout"}
            >
              <ListItemIcon className="list-item-icon">
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
          <Dialog
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={confirmLogoutOpen}
            onClose={() => setConfirmLogoutOpen(false)}
          >
            <DialogTitle id="confirmation-dialog-title">
              Confirm Logout
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setConfirmLogoutOpen(false)}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={() => logout()} color="secondary">
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

const mapDispatchToProps = { logout: () => action(LOGOUT_ACTION) };

export default connect(undefined, mapDispatchToProps)(NavDrawer);
