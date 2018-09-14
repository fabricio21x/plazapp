import { API_ROOT, API_ROOT_WAZE } from './../constants/config.js';
import http from './../utils/http.js';
import {
    INCIDENTS_LOAD_REQUEST,
    INCIDENTS_LOAD_SUCCESS,
    INCIDENTS_LOAD_FAILURE,
    INCIDENTS_INSERT_REQUEST,
    INCIDENTS_INSERT_SUCCESS,
    INCIDENTS_INSERT_FAILURE
} from '../constants/actiontypes';

export function loadIncidentsRequest() {
    return {
        type: INCIDENTS_LOAD_REQUEST
    }
}

function loadIncidentsSuccess(incidents) {
    return {
        type: INCIDENTS_LOAD_SUCCESS,
        action: {incidents}
    }
}

function loadIncidentsFailure(err) {
    return {
        type: INCIDENTS_LOAD_FAILURE,
        err
    }
}

function insertIncidentsRequest() {
    return {
        type: INCIDENTS_INSERT_REQUEST
    }
}

function insertIncidentsSuccess(incidents) {
    return {
        type: INCIDENTS_INSERT_SUCCESS,
    }
}

function insertIncidentsFailure(err) {
    return {
        type: INCIDENTS_INSERT_FAILURE,
        err
    }
}

export const loadIncidents = () => {
  const url = `${API_ROOT_WAZE}/incidents`;
  console.log(url);
  return (dispatch) => {
    dispatch(loadIncidentsRequest());
    return http.get(url)
    .then((incidents) => {
      dispatch(loadIncidentsSuccess(incidents));
      return true;
    }, (err) => dispatch(loadIncidentsFailure(err))
    )
  }    
}

export const insertIncidents = (newIncident, emitIncident) => {
    const url = `${API_ROOT_WAZE}/incidents`; 
    const data = { ...newIncident };
    return (dispatch) => {
      dispatch(insertIncidentsRequest());
      return http.post(url, data)
      .then((new_data) => {
        emitIncident(new_data);
        dispatch(insertIncidentsSuccess(new_data));
        return true;
      }, (err) => dispatch(insertIncidentsFailure(err))
      )
    } 
}