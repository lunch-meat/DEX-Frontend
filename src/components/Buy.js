import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';
import uniq from 'lodash/uniq';

// Import Material-UI Components
import { withStyles } from '@material-ui/core/styles';
import {MenuItem, Icon, ListItemIcon, SvgIcon} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Button from '@material-ui/core/Button';

// Import Buy Actions
import { productFetchData, charityFetchData, buyOrderPostData } from '../actions/buyOrder';
import {Image} from "@material-ui/icons";

// import icons
import ltc from './cryptoIcons/litecoin.jpg';
import dotQrCode from './cryptoIcons/dot qr code.png';
import {Typography} from "@mui/material";

const API_URL = "https://crypto-for-charity.herokuapp.com/api";

// Declare Styles
const styles = theme => ({
  root: {
    textAlign: 'center',
    marginTop: "10px",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 100,
    flexBasis: 200,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit * 3,
    width: 200,
  },
});

class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      quantityWanted: '',
      quantityLabel: 'Amount',
      quantityError: false,
      buyOrderError: false,
      totalPrice: '',
      selectedProduct: { name: "" },
      selectedCharity: "",
    };
  }

  // Fetch Product Data on Componenet Mount
  componentDidMount() {
    this.props.fetchCoins('https://crypto-for-charity.herokuapp.com/api/coins');
    this.props.fetchCharities('https://crypto-for-charity.herokuapp.com/api/charities');
  }

  handleClose = () => {
    this.setState({ buyOrderError: false });
  };

  // Function to handle change in Product dropdown menu
  handleChange = (event, value) => {
    this.setState({ selectedProduct: value }, () => {
      if (value) {
        this.setState({ totalPrice: value.price * this.state.quantityWanted });
      }
    });
  }

  handleAmountChange = event => {
    const { value } = event.target;
    if (!this.state.selectedProduct || isNaN(value)) {
      return true;
    }
    const { price } = this.state.selectedProduct;
    // Set State
    this.setState(
      {
        quantityWanted: value,
      },
      () => {
        this.setState({ totalPrice: price * this.state.quantityWanted });
      },
    );
  };

  handleCharityChange = (event, value) => {
    console.log(value);
    this.setState(
        {
          selectedCharity: value,
        },
        () => {},
    );
  }

  // Function to Post Data
  handlePostOrder = () => {
    const { selectedProduct, quantityWanted, selectedCharity } = this.state;

    if (!selectedProduct || !selectedCharity || quantityWanted === '' || quantityWanted === 0) {
      this.setState({
        buyOrderError: true,
      });
      alert('No coin or quantity selected');
      return true;
    }

    let data = {
      coin: selectedProduct.name,
      amount: quantityWanted,
      charityName: selectedCharity,
    };
    this.props.postData(`${API_URL}/donation`, data);
  };

  render() {
    // Declare State and Props Variable
    const { classes, products, charities } = this.props;
    const {
      quantityWanted,
      totalPrice,
      quantityError,
    } = this.state;

    const filterOptions = createFilterOptions({
      matchFrom: 'any',
      limit: 500,
    });

    const CharitySelection = () => (
        <Autocomplete
            autoComplete
            filterOptions={filterOptions}
            id="charity-select"
            options={uniq(charities.map((c) => (c.name)))}
            onChange={this.handleCharityChange.bind(this)}
            value={this.state.selectedCharity}
            renderInput={(params) => <TextField {...params} type="text" label="Choose a nonprofit" />}
        >
        </Autocomplete>
    )

    // coins
    const ProductsSelection = () => (
        <Autocomplete
            disableListWrap
            disableClearable
            fullWidth
            autoComplete
            id="coin-select"
            options={products || []}
            value={this.state.selectedProduct || { name: "" }}
            getOptionLabel={(o) => o?.name || ""}
            onChange={this.handleChange.bind(this)}
            renderInput={(params) =>
                <TextField {...params} type="text" label="Choose a coin" />}
        >
        </Autocomplete>
    );

    return (
      <div className={classes.root}>
        {products.length !== 0 ? (
          <div>
            <Stack direction="column" spacing={2}>
              <CharitySelection />
              <ProductsSelection />
              <Stack direction="row" spacing={2}>
                <TextField
                    error={quantityError}
                    type="number"
                    inputProps={{ min: '0' }}
                    value={quantityWanted}
                    onChange={this.handleAmountChange}
                    label={`Amount${this.state.selectedProduct ? ` in ${this.state.selectedProduct.name}` : "" }`}
                    name="quantityWanted"
                    id="product-quantity"
                    disabled={!this.state.selectedProduct}
                    className={classNames(classes.margin, classes.textField)}
                />
                <TextField
                    label="USD (estimated)"
                    disabled
                    variant="standard"
                    value={totalPrice ? `$${Math.round(totalPrice)}` : ''}
                    id="usd-value"
                />
              </Stack>
            </Stack>

            {/*<div className={classNames(classes.margin)} >*/}
            {/*  <img src={dotQrCode} />*/}
            {/*</div>*/}
            <Button
              onClick={this.handlePostOrder}
              variant="raised"
              color="primary"
              className={classes.button}
            >
              Donate {this.state.selectedProduct?.name}
            </Button>
          </div>
        ) : null}
        {/*<Snackbar*/}
        {/*  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}*/}
        {/*  open={buyOrderError}*/}
        {/*  onClose={this.handleClose}*/}
        {/*  ContentProps={{*/}
        {/*    'aria-describedby': 'message-id',*/}
        {/*  }}*/}
        {/*  message={<span id="message-id">Please select an order.</span>}*/}
        {/*/>*/}
      </div>
    );
  }
}

Buy.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchCoins: PropTypes.func.isRequired,
  fetchCharities: PropTypes.func.isRequired,
  postData: PropTypes.func.isRequired,
  onChangeIndex: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
  charities: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    products: state.products,
    charities: state.charities,
    isLoading: state.buyOrderIsLoading,
    hasErrored: state.buyOrderHasErrored,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCoins: url => dispatch(productFetchData(url)),
    fetchCharities: url => dispatch(charityFetchData(url)),
    postData: (url, data) => dispatch(buyOrderPostData(url, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Buy),
);
