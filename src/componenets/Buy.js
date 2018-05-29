import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import Material-UI Components
import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem } from '@material-ui/core';

// Import Buy Actions
import { productFetchData, buyOrderPostData } from '../actions/buyOrder';

// Declare Styles
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Id: 0,
      name: '',
      price: 0,
      quantityAvailable: 0,
    };
  }
  componentDidMount() {
    this.props.fetchData('http://localhost:8000/products');
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes } = this.props;

    const Products = () =>
      this.props.products.length ? (
        <TextField
          name="name"
          id="select-product"
          select
          label="Select"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select the Product"
          margin="normal"
        >
          {this.props.products.map(product => (
            <MenuItem key={product.Id} value={product.name}>
              {product.name}
            </MenuItem>
          ))}
        </TextField>
      ) : null;

    return (
      <div>
        <Products />
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
