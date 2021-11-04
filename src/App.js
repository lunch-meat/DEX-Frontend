import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Material-Ui Componenets
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Import Components
import Purchase from './containers/Purchase';
import OrderTable from './components/OrderTable';

// Declare Drawer Width
const drawerWidth = 350;

// Declare Styles
const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    width: '350px',
    margin: '1px auto auto auto',
    border: '1px dashed #D3D3D3',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'white',
    margin: '1px auto auto auto',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

class ClippedDrawer extends Component {
  render() {
    const { classes } = this.props;

    return (
        <div className={classes.border}>
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Coin Give
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          anchor="top"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Purchase />
        </Drawer>

        {/*<main className={classes.content}>*/}
        {/*  <div className={classes.toolbar} />*/}
        {/*  <OrderTable />*/}
        {/*</main>*/}
      </div>
        </div>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
