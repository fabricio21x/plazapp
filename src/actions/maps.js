import { API_ROOT_WAZE } from './../constants/config.js';
import http from './../utils/http.js';
import { MAP_LOAD_REQUEST, MAP_LOAD_SUCCESS, MAP_LOAD_FAILURE } from '../constants/actiontypes';

function loadMapsRequest() {
  return {
    type: MAP_LOAD_REQUEST
  };
}

function loadMapsSuccess(maps) {
  return {
    type: MAP_LOAD_SUCCESS,
    maps
  };
}

function loadMapsFailure(err) {
  return {
    type: MAP_LOAD_FAILURE,
    err
  };
}

//Por ahora siempre cragará el mapa #1
export const loadMaps = () => {
  const url = `${API_ROOT_WAZE}/mall_levels/current`;
  return dispatch => {
    dispatch(loadMapsRequest());
    return http.get(url).then(
      maps => {
        dispatch(loadMapsSuccess(maps));
        return true;
      },
      err => {
        console.log(err);
        dispatch(loadMapsFailure(err));
      }
    );
  };
};
