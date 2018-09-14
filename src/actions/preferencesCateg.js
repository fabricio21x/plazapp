import { API_ROOT } from './../constants/config.js';
import http from './../utils/http.js';
import {
    PREFERENCESCAT_LOAD_REQUEST,
    PREFERENCESCAT_LOAD_SUCCESS,
    PREFERENCESCAT_LOAD_FAILURE,
    PREFERENCESCAT_INSERT_REQUEST,
    PREFERENCESCAT_INSERT_SUCCESS,
    PREFERENCESCAT_INSERT_FAILURE
} from '../constants/actiontypes';

function loadPreferencesCatRequest() {
    return {
        type: PREFERENCESCAT_LOAD_REQUEST
    }
}

function loadPreferencesCatSuccess(preferencesCat) {
    return {
        type: PREFERENCESCAT_LOAD_SUCCESS,
        preferencesCat
    }
}

function loadPreferencesCatFailure(err) {
    return {
        type: PREFERENCESCAT_LOAD_FAILURE,
        err
    }
}

function insertPreferencesCatRequest() {
    return {
        type: PREFERENCESCAT_INSERT_REQUEST
    }
}

function insertPreferencesCatSuccess() {
    return {
        type: PREFERENCESCAT_INSERT_SUCCESS,
    }
}

function insertPreferencesCatFailure() {
    return {
        type: PREFERENCESCAT_INSERT_FAILURE,
    }
}

export const loadPreferencesCat = () => {
  const url = `${API_ROOT}/store_categories/preferences`; 
  console.log(url);
  console.log('LEYENDO ...');       /////////////////////////////////////////
  return (dispatch) => {
    dispatch(loadPreferencesCatRequest());
    return http.get(url)
    .then((preferencesCat) => {
      console.log(preferencesCat);  ///////////////////////////////////////
      dispatch(loadPreferencesCatSuccess(preferencesCat.store_categories));
      return true;
    }, (err) => dispatch(loadPreferencesCatFailure(err))
    )
  }
}

export function insertPreferencesCat(newPreference) {
    const url = `${API_ROOT}/store_categories/like`;
    return (dispatch) => {
      dispatch(insertPreferencesCatRequest());
      return http.post(url, newPreference, true)
      .then((newPreference) => {
        dispatch(insertPreferencesCatSuccess());
        console.log('INSERTOOOOOOOO!!'); /////////////////////////////////////////////////////
        return true;
      }, (err) => {
          dispatch(insertPreferencesCatFailure());
          return false;
      });
    } 
}
