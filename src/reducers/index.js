import { combineReducers } from 'redux';
import { orders, ordersHasErrored, ordersIsLoading } from './orders';

export default combineReducers({
    orders,
    ordersHasErrored,
    ordersIsLoading
});