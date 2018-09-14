import { API_ROOT } from './../constants/config.js';
import http from './../utils/http.js';
import {
    PRODCATEGORIES_LOAD_REQUEST,
    PRODCATEGORIES_LOAD_SUCCESS,
    PRODCATEGORIES_LOAD_FAILURE
} from '../constants/actiontypes';

function loadProdCategoriesRequest() {
    return {
        type: PRODCATEGORIES_LOAD_REQUEST
    };
}

function loadProdCategoriesSuccess(prodCategories) {
    return {
        type: PRODCATEGORIES_LOAD_SUCCESS,
        prodCategories
    };
}

function loadProdCategoriesFailure(err) {
    return {
        type: PRODCATEGORIES_LOAD_FAILURE,
        err
    };
}

export const loadProdCategories = () => {
  const url = `${API_ROOT}/product_categories`; 
  console.log(url);
  return (dispatch) => {
    dispatch(loadProdCategoriesRequest());
    return http.get(url)
    .then((prodCategories) => {
      console.log("So we got here!");
      console.log(prodCategories);
      dispatch(loadProdCategoriesSuccess(prodCategories));
      return true;
    }, (err) => dispatch(loadProdCategoriesFailure(err))
    );
  };
};
