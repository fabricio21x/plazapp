import { API_ROOT } from './../constants/config.js';
import http from './../utils/http.js';
import {
    PRODUCTS_LOAD_REQUEST,
    PRODUCTS_LOAD_SUCCESS,
    PRODUCTS_LOAD_FAILURE
} from '../constants/actiontypes';

function loadProductsRequest() {
    return {
        type: PRODUCTS_LOAD_REQUEST
    };
}

function loadProductsSuccess(products) {
    return {
        type: PRODUCTS_LOAD_SUCCESS,
        products
    };
}

function loadProductsFailure(err) {
    return {
        type: PRODUCTS_LOAD_FAILURE,
        err
    };
}

export const loadProducts = () => {
  const url = `${API_ROOT}/products?store_id=`; 
  console.log(url);
  return (dispatch) => {
    dispatch(loadProductsRequest());
    return http.get(url)
    .then((products) => {
      dispatch(loadProductsSuccess(products));
      return true;
    }, (err) => dispatch(loadProductsFailure(err))
    );
  };
};

export const searchProducts = () => {
    const url = `${API_ROOT}/products/search?name=&product_category=&min_price=&max_price=&only_mobile=true&size=medium`; 
    console.log(url);
    return (dispatch) => {
      dispatch(loadProductsRequest());
      return http.get(url)
      .then((products) => {
        dispatch(loadProductsSuccess(products));
        return true;
      }, (err) => dispatch(loadProductsFailure(err))
      );
    };
};

export const loadProductsByStoreCategories = (idStoreCategory) => {
  const url = `${API_ROOT}/products/search?name=&product_category=&min_price=&max_price=&only_mobile=&store_category=${idStoreCategory}&size=medium`;
  console.log('URL FINNNNN');
  console.log(url);
  return (dispatch) => {
    dispatch(loadProductsRequest());
    return http.get(url)
    .then((products) => {
      //var myProducts = { idStoreCategory: idStoreCategory, products: products };      // Yo le mando mi fomato para facilitar la insrción
      dispatch(loadProductsSuccess(products));
      console.log('Los productos del query son: ');
      console.log(products);
      return true;
    }, (err) => dispatch(loadProductsFailure(err))
    );
  };
};


export const loadProductsByStoreStoreCategories = (idStoreCategory) => {
  const url = `${API_ROOT}/products/search?name=&product_category=&min_price=&max_price=&only_mobile=&store_category=${idStoreCategory}&size=medium`;
  console.log('URL FINNNNN');
  console.log(url);
  return (dispatch) => {
    dispatch(loadProductsRequest());
    return http.get(url)
    .then((products) => {
      var myProducts = { idStoreCategory: idStoreCategory, products: products };      // Yo le mando mi fomato para facilitar la insrción
      dispatch(loadProductsSuccess(myProducts));
      console.log('Los productos del query son: ');
      console.log(myProducts);
      return true;
    }, (err) => dispatch(loadProductsFailure(err))
    );
  };
};
