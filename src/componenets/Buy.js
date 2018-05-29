import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Import Material-UI Components
import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, InputAdornment } from '@material-ui/core';

// Import Buy Actions
import { productFetchData, buyOrderPostData } from '../actions/buyOrder';

// Declare Styles
const styles = theme => ({
  root: {
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    flexBasis: 200,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      name: '',
      price: 0,
      quantity: 0,
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

    if (name === 'name') {
      this.setState({ index: value });
    }

    console.log(this.state.name);
  };

  render() {
    const { classes, products } = this.props;
    const { index, quantity, name } = this.state;

    const ProductsSelection = () => (
      <TextField
        name="name"
        id="product"
        value={name}
        select
        label="Select Product"
        className={classes.textField}
        onChange={this.handleChange}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        {products.map((product, index) => (
          <MenuItem key={index} value={index}>
            {product.name}
          </MenuItem>
        ))}
      </TextField>
    );

    const QuantityInput = () => (
      <TextField
        value={quantity}
        onChange={this.handleChange}
        label="Quantity"
        name="quantity"
        id="product-quantity"
        className={classNames(classes.margin, classes.textField)}
      />
    );

    const PriceInput = () => (
      <TextField
        disabled
        label="Price"
        name="price"
        id="product-price"
        value={products[index].price * quantity}
        className={classNames(classes.margin, classes.textField)}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    );

    return (
      <div className={classes.root}>
        {products.length !== 0 ? (
          <div>
            <ProductsSelection />
            <QuantityInput />
            <PriceInput />
          </div>
        ) : null}
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
