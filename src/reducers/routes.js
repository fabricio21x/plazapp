import {
  ROUTE_LOAD_REQUEST,
  ROUTE_LOAD_SUCCESS,
  ROUTE_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
  route: [],
  isFetching: false,
  error: false
};

export default (routesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROUTE_LOAD_REQUEST:
      return {
        ...state,
        route: [],
        isFetching: true
      };
    case ROUTE_LOAD_SUCCESS:
      return {
        ...state,
        route: action.route,
        isFetching: false
      };
    case ROUTE_LOAD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
});
