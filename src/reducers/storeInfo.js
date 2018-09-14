import {
  STOREINFO_LOAD_REQUEST,
  STOREINFO_LOAD_SUCCESS,
  STOREINFO_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
  storeInfo: [],
  isFetching: false,
  error: false
};

export default (storeInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case STOREINFO_LOAD_REQUEST:
      return {
        ...state,
        storeInfo: [],
        isFetching: true
      };
    case STOREINFO_LOAD_SUCCESS:
      return {
        ...state,
        storeInfo: action.storeInfo,
        isFetching: false
      };
    case STOREINFO_LOAD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
});
