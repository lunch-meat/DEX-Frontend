import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import Material-UI Components
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import purple from '@material-ui/core/colors/purple';

// Import Order Actions
import { ordersFetchData } from '../actions/orders';

// Declare Styles
const styles = theme => ({
  root: {
    width: '100%',
    margin: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
  row: {},
  cell: {
    color: purple[500],
  },
});

class OrderTable extends Component {
  componentDidMount() {
    this.props.fetchData('http://localhost:8000/orders/1');
  }

  render() {
    const { classes } = this.props;

    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell numeric>Logo</TableCell>
              <TableCell>Product</TableCell>
              <TableCell numeric>Quantity</TableCell>
              <TableCell numeric>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.orders.map(order => {
              return (
                <TableRow key={order.Id}>
                  <TableCell numeric>
                    {' '}
                    <Avatar
                      alt="Remy Sharp"
                      src={`/static/images/${order.logo}`}
                      className={classes.avatar}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {order.name}
                  </TableCell>
                  <TableCell numeric>{order.Quantity}</TableCell>
                  <TableCell
                    className={order.Order_Type === 1 ? classes.cell : null}
                    numeric
                  >
                    {order.price}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

OrderTable.propTypes = {
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
  withStyles(styles)(OrderTable),
);
