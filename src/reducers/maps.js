import { MAP_LOAD_REQUEST, MAP_LOAD_SUCCESS, MAP_LOAD_FAILURE } from '../constants/actiontypes';

const initialState = {
  maps: [],
  isFetching: false,
  error: false
};

export default (mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAP_LOAD_REQUEST:
      return {
        ...state,
        maps: [],
        isFetching: true
      };
    case MAP_LOAD_SUCCESS:
      return {
        ...state,
        maps: action.maps,
        isFetching: false
      };
    case MAP_LOAD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
});
