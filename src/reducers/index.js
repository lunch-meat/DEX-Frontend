import { combineReducers } from 'redux';
import { orders, ordersHasErrored, ordersIsLoading } from './orders';
import {
  products,
  charities,
  buyOrder,
  buyOrderIsLoading,
  buyOrderHasErrored,
} from './buyOrder';

export default combineReducers({
  orders,
  ordersHasErrored,
  ordersIsLoading,
  products,
  charities,
  buyOrder,
  buyOrderIsLoading,
  buyOrderHasErrored,
});
