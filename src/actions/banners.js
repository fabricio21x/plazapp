import {API_ROOT} from './../constants/config.js';
import http from './../utils/http.js';
import {
    BANNERS_LOAD_REQUEST,
    BANNERS_LOAD_SUCCESS,
    BANNERS_LOAD_FAILURE
} from '../constants/actiontypes';

function loadBannersRequest() {
    return {
        type: BANNERS_LOAD_REQUEST
    }
}

function loadBannersSuccess(banners) {
    return {
        type: BANNERS_LOAD_SUCCESS,
        banners
    }
}

function loadBannersFailure(err) {
    return {
        type: BANNERS_LOAD_FAILURE,
        err
    }
}

export const loadBanners = () => {
  const url = `${API_ROOT}/events/banners`; //por mientras...
  console.log(url);
  return (dispatch)=>{
    dispatch(loadBannersRequest());
    return http.get(url)
    .then((banners)=>{
      dispatch(loadBannersSuccess(banners));
      return true;
    }, (err)=>dispatch(loadBannersFailure(err))
    )
  }
}
