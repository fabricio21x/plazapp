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

function loadProductsFavSuccess(products) {
    return {
        type: PRODFAVOURITES_LOAD_SUCCESS,
        products
    }
}

function loadProductsFavFailure(err) {
    return {
        type: PRODFAVOURITES_LOAD_FAILURE,
        err
    }
}

export const loadProductsFav = () => {
  const url = `${API_ROOT}/products/favorites`; //por mientras...
  console.log(url);
  return (dispatch)=>{
    dispatch(loadProductsFavRequest());
    return http.get(url)
    .then((products)=>{
      dispatch(loadProductsFavSuccess(products));
      return true;
    }, (err)=>dispatch(loadProductsFavFailure(err))
    )
  }
}
export const insertFavouritesProduct = (newFavourite) => {
    const url = `${API_ROOT}/store_categories/like`; 
    console.log(url);
    const data = { ...newFavourite };
    return (dispatch) => {
      dispatch(insertPreferencesCatRequest());
      return http.post(url, data)
      .then(() => {
        dispatch(insertPreferencesCatSuccess(data));
        return true;
      }, (err) => dispatch(insertPreferencesCatFailure(err))
      )
    } 
}


