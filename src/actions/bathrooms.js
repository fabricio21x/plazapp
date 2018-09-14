import { API_ROOT_WAZE } from './../constants/config.js';
import http from './../utils/http.js';
import {
  BATHROOM_LOAD_REQUEST,
  BATHROOM_LOAD_SUCCESS,
  BATHROOM_LOAD_FAILURE
} from '../constants/actiontypes';

function loadBathroomsRequest() {
  return {
    type: BATHROOM_LOAD_REQUEST
  };
}

function loadBathroomsSuccess(baths) {
  return {
    type: BATHROOM_LOAD_SUCCESS,
    baths
  };
}

function loadBathroomsFailure(err) {
  return {
    type: BATHROOM_LOAD_FAILURE,
    err
  };
}

export const loadBathrooms = (map = '', level = '') => {
  const map_id = map != '' ? map.toString() : '1';
  console.log(map_id);
  const level_id = level != '' ? level.toString() : '1';

  const url = `${API_ROOT_WAZE}/mall_elements/others?map_id=${map_id}&type=BATHROOM&state=1`;

  console.log(url);
  return dispatch => {
    dispatch(loadBathroomsRequest());
    return http.get(url).then(
      baths => {
        dispatch(loadBathroomsSuccess(baths));
        console.log(baths);
        return true;
      },
      err => dispatch(loadBathroomsFailure(err))
    );
  };
};
