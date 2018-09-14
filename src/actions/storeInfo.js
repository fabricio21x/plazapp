import { API_ROOT_WAZE } from './../constants/config.js';
import http from './../utils/http.js';
import {
  STOREINFO_LOAD_REQUEST,
  STOREINFO_LOAD_SUCCESS,
  STOREINFO_LOAD_FAILURE
} from '../constants/actiontypes';

function loadStoreInfoRequest() {
  return {
    type: STOREINFO_LOAD_REQUEST
  };
}

function loadStoreInfoSuccess(storeInfo) {
  return {
    type: STOREINFO_LOAD_SUCCESS,
    storeInfo
  };
} 

function loadStoreInfoFailure(err) {
  return {
    type: STOREINFO_LOAD_FAILURE,
    err
  };
}

export const loadStoreInfo = (strore_id, level_id = '') => {
  const url = `${API_ROOT_WAZE}/mall_elements/bystore?map_id=&store_id=${strore_id}&level_id=${level_id}`;
  return dispatch => {
    dispatch(loadStoreInfoRequest());
    return http.get(url).then(
      storeInfo => {
        dispatch(loadStoreInfoSuccess(storeInfo));
        return true;
      },
      err => {
        console.log(err);
        dispatch(loadStoreInfoFailure(err));
      }
    );
  };
};
