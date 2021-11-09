import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uniq from 'lodash/uniq';

// Import Material-UI Components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@material-ui/core/Button';

// Import Buy Actions
import {
  productFetchData,
  charityFetchData,
  buyOrderPostData,
  buyOrderIsLoading,
  walletFetchDataSuccess, buyOrderPostDataSuccess, buyOrderHasErrored
} from '../actions/buyOrder';
import {Card, Snackbar, Typography} from "@mui/material";
import axios from "axios";
import dotqrcode from './cryptoIcons/dot qr code.png';

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
      walletAddress: "",
      showWalletDialog: false,
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
    this.setState({ selectedCharity: value });
  }

  // Function to Post Data
  handlePostOrder = () => {
    this.setState({ buyOrderIsLoading: true });
    const { selectedProduct, quantityWanted, selectedCharity } = this.state;
    if (!selectedProduct || !selectedCharity || quantityWanted === '' || quantityWanted === 0) {
      this.setState({ buyOrderError: true });
      alert('No coin or quantity selected');
      return true;
    }

    let data = {
      coin: selectedProduct.name,
      amount: quantityWanted,
      charityName: selectedCharity,
    };
    axios.post(`${API_URL}/donation`, data)
        .then(response => {
          if (response.status !== 200) {
            throw Error(response.statusText);
          }

          this.setState({ buyOrderIsLoading: false });
          return response;
        })
        .then(response => {
          console.log(response);
          this.setState({ showWalletDialog: true, walletAddress: response.data[0] })
        })
        .catch(() => this.setState({ buyOrderIsErrored: false }));
    // this.props.postData(`${API_URL}/donation`, data);
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
            getOptionLabel={(o) => o ? o.name : ""}
            onChange={this.handleChange.bind(this)}
            renderInput={(params) =>
                <TextField {...params} type="text" label="Choose a coin" />}
        >
        </Autocomplete>
    );

    return (
      <div className={classes.root}>
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
              Donate {this.state.selectedProduct ? this.state.selectedProduct.name : ""}
            </Button>
          </div>
        <Dialog
            open={this.state.showWalletDialog}
            onClose={() => this.setState({ showWalletDialog: false, walletAddress: null })}
        >
            <Card>
              <div className={classes.root}>
                <div className={classNames(classes.margin)} >Wallet address:</div>
                <div className={classNames(classes.margin)} >
                  {this.state.walletAddress ? this.state.walletAddress.walletAddress : ""}
                </div>
                <div className={classNames(classes.margin)} ><img src={dotqrcode} /></div>
              </div>
            </Card>
        </Dialog>
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
