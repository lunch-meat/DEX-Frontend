import React, { Component } from 'react';

// Import Material-UI Components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

class Order extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List>
          <ListItem>
            <Avatar />
            <ListItemText primary="Order 1" secondary="Price: $" />
          </ListItem>
          <ListItem>
            <Avatar />
            <ListItemText primary="Order 2" secondary="Price: $" />
          </ListItem>
          <ListItem>
            <Avatar />
            <ListItemText primary="Order 3" secondary="Price: $" />
          </ListItem>
        </List>
      </div>
    );
  }
}

Order.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Order);
