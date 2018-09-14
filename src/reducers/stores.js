import {
  STORES_LOAD_REQUEST,
  STORES_LOAD_SUCCESS,
  STORES_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
  stores: [],
  isFetching: false,
  error: false
};

export default (storesReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORES_LOAD_REQUEST:
      return {
        ...state,
        stores: [],
        isFetching: true
      };
    case STORES_LOAD_SUCCESS:
      return {
        ...state,
        stores: action.stores,
        isFetching: false
      };
    case STORES_LOAD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
});
