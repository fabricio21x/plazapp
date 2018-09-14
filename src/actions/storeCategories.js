import { API_ROOT } from './../constants/config.js';
import http from './../utils/http.js';
import {
    CATEGORIES_LOAD_REQUEST,
    CATEGORIES_LOAD_SUCCESS,
    CATEGORIES_LOAD_FAILURE
} from '../constants/actiontypes';

function loadCategoriesRequest() {
    return {
        type: CATEGORIES_LOAD_REQUEST
    }
}

function loadCategoriesSuccess(categories) {
    return {
        type: CATEGORIES_LOAD_SUCCESS,
        categories
    };
}

function loadCategoriesFailure(err) {
    return {
        type: CATEGORIES_LOAD_FAILURE,
        err
    }
}

export const loadCategories = () => {
  const url = `${API_ROOT}/store_categories`; 
  console.log(url);
  return (dispatch) => {
    dispatch(loadCategoriesRequest());
    return http.get(url)
    .then((categories) => {
      console.log('CATEGORIAS AQUI');
      console.log(categories);
      dispatch(loadCategoriesSuccess(categories));
      return true;
    }, (err) => dispatch(loadCategoriesFailure(err))
    );
  };
};
