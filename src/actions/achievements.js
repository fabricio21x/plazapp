import { API_ROOT } from './../constants/config.js';
import http from './../utils/http.js';
import {
    ACHIEVEMENTS_LOAD_REQUEST,
    ACHIEVEMENTS_LOAD_SUCCESS,
    ACHIEVEMENTS_LOAD_FAILURE
} from '../constants/actiontypes';

function loadAchievementsRequest() {
    return {
        type: ACHIEVEMENTS_LOAD_REQUEST
    }
}

function loadAchievementsSuccess(achievements) {
    return {
        type: ACHIEVEMENTS_LOAD_SUCCESS,
        achievements
    }
}

function loadAchievementsFailure(err) {
    return {
        type: ACHIEVEMENTS_LOAD_FAILURE,
        err
    }
}

export const loadAchievements = () => {
  const url = `${API_ROOT}/points_menus`; 
  console.log(url);
  return (dispatch) => {
    dispatch(loadAchievementsRequest());
    return http.get(url)
    .then((achievements) => {
      dispatch(loadAchievementsSuccess(achievements));
      return true;
    }, (err) => dispatch(loadAchievementsFailure(err))
    )
  }
}