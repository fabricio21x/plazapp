import { API_ROOT_MKT } from './../constants/config.js';
import http from './../utils/http.js';
import {
    RECOMMENDEDCATEGORIES_LOAD_REQUEST,
    RECOMMENDEDCATEGORIES_LOAD_SUCCESS,
    RECOMMENDEDCATEGORIES_LOAD_FAILURE,
} from '../constants/actiontypes';

function loadRecommendedCategoriesRequest() {
    return {
        type: RECOMMENDEDCATEGORIES_LOAD_REQUEST
    }
}

function loadRecommendedCategoriesSuccess(recommendedCategories) {
    return {
        type: RECOMMENDEDCATEGORIES_LOAD_SUCCESS,
        recommendedCategories
    }
}

function loadRecommendedCategoriesFailure(err) {
    return {
        type: RECOMMENDEDCATEGORIES_LOAD_FAILURE,
        err
    }
}

export const loadRecommendedCategories = (idUser) => {
  const url = `${API_ROOT_MKT}/recommended_categories/${idUser}`; 
  console.log(url);
  console.log('LEYENDO MKT...');       /////////////////////////////////////////
  return (dispatch) => {
    dispatch(loadRecommendedCategoriesRequest());
    return http.get(url)
    .then((recommendedCategories) => {
      console.log("So we got here!");
      console.log(recommendedCategories);  ///////////////////////////////////////
      dispatch(loadRecommendedCategoriesSuccess(recommendedCategories));
      return true;
    }, (err) => dispatch(loadRecommendedCategoriesFailure(err))
    );
  };
};

