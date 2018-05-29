import React, { Component } from 'react';

// Import Material-Ui Components
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import BuyIcon from '@material-ui/icons/AddShoppingCart';
import SellIcon from '@material-ui/icons/RemoveShoppingCart';

// Import Buy and Sell Components
import Buy from '../componenets/Buy';

class Purchase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div style={{ width: 350 }}>
        <Paper>
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
        <div>
          {value === 0 && (
            <div>
              <Buy />
            </div>
          )}
          {value === 1 && (
            <div>
              <Typography>Item Two</Typography>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Purchase;
