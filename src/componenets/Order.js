import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Material-UI Components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

// Import Order Actions
import { ordersFetchData } from '../actions/orders';

// Declare Styles
const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

class Order extends Component {
  componentDidMount() {
    this.props.fetchData('http://localhost:8000/orders/1');
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <List>
        {this.props.orders.map(order => (
          <ListItem>
            <Avatar />
            <ListItemText
              primary={`${order.Quantity} of ${order.name}`}
              secondary={`Price: $ ${order.price}`}
            />
          </ListItem>
        ))}
      </List>
    );
  }
}

Order.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    orders: state.orders,
    hasErrored: state.ordersHasErrored,
    isLoading: state.ordersIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(ordersFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Order),
);
