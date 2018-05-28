import axios from 'axios';

export function ordersHasErrored(bool) {
  return {
    type: 'orders_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function ordersIsLoading(bool) {
  return {
    type: 'orders_IS_LOADING',
    isLoading: bool,
  };
}

export function ordersFetchDataSuccess(orders) {
  return {
    type: 'orders_FETCH_DATA_SUCCESS',
    orders,
  };
}

export function ordersFetchData(url) {
  return dispatch => {
    dispatch(ordersIsLoading(true));

    axios
      .get(url)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(ordersIsLoading(false));

        return response;
      })
      .then(response => dispatch(ordersFetchDataSuccess(response.data)))
      .catch(() => dispatch(ordersHasErrored(true)));
  };
}
