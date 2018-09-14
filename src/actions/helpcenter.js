import { API_ROOT_WAZE } from './../constants/config.js';
import http from './../utils/http.js';
import {
  HELPCENTER_LOAD_REQUEST,
  HELPCENTER_LOAD_SUCCESS,
  HELPCENTER_LOAD_FAILURE
} from '../constants/actiontypes';

function loadHelpCenterRequest() {
  return {
    type: HELPCENTER_LOAD_REQUEST
  };
}

function loadHelpCenterSuccess(centers) {
  return {
    type: HELPCENTER_LOAD_SUCCESS,
    centers
  };
}

function loadHelpCenterFailure(err) {
  return {
    type: HELPCENTER_LOAD_FAILURE,
    err
  };
}

export const loadHelpCenter = (map = '', level = '') => {
  const map_id = map != '' ? map.toString() : '1';
  console.log(map_id);
  const level_id = level != '' ? level.toString() : '1';

  const url = `${API_ROOT_WAZE}/mall_elements/others?map_id=${map_id}&type=SUPPORT&state=1`;

  console.log(url);

  return dispatch => {
    dispatch(loadHelpCenterRequest());
    console.log('in');

    return http.get(url).then(
      centers => {
        dispatch(loadHelpCenterSuccess(centers));
        console.log(centers);
        return true;
      },
      err => {
        dispatch(loadHelpCenterFailure(err));
        console.log('error');
        console.log(err);
      }
    );
  };
};
