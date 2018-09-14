import {API_ROOT} from './../constants/config.js';
import http from './../utils/http.js';
import {
    PRODFAVOURITES_LOAD_REQUEST,
    PRODFAVOURITES_LOAD_SUCCESS,
    PRODFAVOURITES_LOAD_FAILURE
} from '../constants/actiontypes';

function loadProductsFavRequest() {
    return {
        type: PRODFAVOURITES_LOAD_REQUEST
    }
}

function loadProductsFavSuccess(favProds) {
    return {
        type: PRODFAVOURITES_LOAD_SUCCESS,
        favProds
    }
}

function loadProductsFavFailure(err) {
    return {
        type: PRODFAVOURITES_LOAD_FAILURE,
        err
    }
}

export const loadProductsFav = () => {
  const url = `${API_ROOT}/products/favorites`;
  console.log(url);
  return (dispatch)=>{
    dispatch(loadProductsFavRequest());
    return http.get(url)
    .then((favProds)=>{
      dispatch(loadProductsFavSuccess(favProds));
      return true;
    }, (err)=>dispatch(loadProductsFavFailure(err))
    )
  }
}