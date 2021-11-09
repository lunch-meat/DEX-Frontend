import axios from 'axios';

export function buyOrderHasErrored(bool) {
  return {
    type: 'BUY_ORDER_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function buyOrderIsLoading(bool) {
  return {
    type: 'BUY_ORDER_IS_LOADING',
    isLoading: bool,
  };
}

export function buyOrderPostDataSuccess(bool) {
  return {
    type: 'BUY_ORDER_POST_DATA_SUCCESS',
    isSuccess: bool,
  };
}

export function buyOrderPostData(url, header) {
  return dispatch => {
    dispatch(buyOrderIsLoading(true));

    axios
      .post(url, header)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(buyOrderIsLoading(false));

        return response;
      })
      .then(response => {
          dispatch(walletFetchDataSuccess(response))
          dispatch(buyOrderPostDataSuccess(true))
      })
      .catch(() => dispatch(buyOrderHasErrored(true)));
  };
}

export function productFetchDataSuccess(products) {
  return {
    type: 'PRODUCT_FETCH_DATA_SUCCESS',
    products,
  };
}

export function walletFetchDataSuccess(wallet) {
    return {
        type: 'WALLET_FETCH_DATA_SUCCESS',
        wallet,
    };
}

export function charityFetchDataSuccess(charities) {
    return {
        type: 'CHARITY_FETCH_DATA_SUCCESS',
        charities,
    };
}

export function productFetchData(url) {
  return dispatch => {
    axios
      .get(url)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => dispatch(productFetchDataSuccess(response.data)));
  };
}

export function charityFetchData(url) {
    return dispatch => {
        axios
            .get(url)
            .then(response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then(response => dispatch(charityFetchDataSuccess(response.data)));
    };
}
