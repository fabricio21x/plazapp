import {
  BATHROOM_LOAD_REQUEST,
  BATHROOM_LOAD_SUCCESS,
  BATHROOM_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
  baths: [],
  isFetching: false,
  error: false
};

export default (bathroomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BATHROOM_LOAD_REQUEST:
      return {
        ...state,
        baths: [],
        isFetching: true
      };
    case BATHROOM_LOAD_SUCCESS:
      return {
        ...state,
        baths: action.baths,
        isFetching: false
      };
    case BATHROOM_LOAD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
});
