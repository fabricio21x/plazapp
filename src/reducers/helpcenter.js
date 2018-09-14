import {
  HELPCENTER_LOAD_REQUEST,
  HELPCENTER_LOAD_SUCCESS,
  HELPCENTER_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
  centers: [],
  isFetching: false,
  error: false
};

export default (helpcenterReducer = (state = initialState, action) => {
  switch (action.type) {
    case HELPCENTER_LOAD_REQUEST:
      return {
        ...state,
        centers: [],
        isFetching: true
      };
    case HELPCENTER_LOAD_SUCCESS:
      return {
        ...state,
        centers: action.centers,
        isFetching: false
      };
    case HELPCENTER_LOAD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
});
