import { API_ROOT } from './../constants/config.js';
import http from './../utils/http.js';
import {
    EVENTS_LOAD_REQUEST,
    EVENTS_LOAD_SUCCESS,
    EVENTS_LOAD_FAILURE
} from '../constants/actiontypes';

function loadEventsRequest() {
    return {
        type: EVENTS_LOAD_REQUEST
    }
}

function loadEventsSuccess(events) {
    return {
        type: EVENTS_LOAD_SUCCESS,
        events
    }
}

function loadEventsFailure(err) {
    return {
        type: EVENTS_LOAD_FAILURE,
        err
    }
}

export const loadEvents = () => {
  const url = `${API_ROOT}/events`; 
  console.log(url);
  return (dispatch) => {
    dispatch(loadEventsRequest());
    return http.get(url)
    .then((events) => {
      dispatch(loadEventsSuccess(events));
      return true;
    }, (err) => dispatch(loadEventsFailure(err))
    )
  }
}
