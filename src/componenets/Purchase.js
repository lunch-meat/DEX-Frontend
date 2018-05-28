import React, { Component } from 'react';

// Import Material-Ui Components
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BuyIcon from '@material-ui/icons/AddShoppingCart';
import SellIcon from '@material-ui/icons/RemoveShoppingCart';

export default class Purchase extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Paper style={{ width: 350 }}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<BuyIcon />} label="BUY" />
          <Tab icon={<SellIcon />} label="SELL" />
        </Tabs>
      </Paper>
    );
  }
}
