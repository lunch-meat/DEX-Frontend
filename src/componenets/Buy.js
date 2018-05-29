import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Material-UI Components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

// Import Buy Actions
import { productFetchData, buyOrderPostData } from '../actions/buyOrder';

// Declare Styles
const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
});

class Buy extends Component {
  componentDidMount() {
    this.props.fetchData('http://localhost:8000/products');
  }

  render() {
    console.log(this.props.products);
    return (
      <div>
        {this.props.products.map(product => {
          <p key={product.Id}>{product.name}</p>;
        })}
      </div>
    );
  }
}

Buy.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  postData: PropTypes.func.isRequired,
  buyOrder: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    products: state.products,
    buyOrder: state.buyOrder,
    isLoading: state.buyOrderIsLoading,
    hasErrored: state.buyOrderHasErrored,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(productFetchData(url)),
    postData: (url, header) => dispatch(buyOrderPostData(url, header)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Buy),
);
