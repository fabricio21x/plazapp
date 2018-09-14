import { API_ROOT } from './../constants/config.js';
import http from './../utils/http.js';
import {
    PRODUCTSADVANCED_LOAD_REQUEST,
    PRODUCTSADVANCED_LOAD_SUCCESS,
    PRODUCTSADVANCED_LOAD_FAILURE
} from '../constants/actiontypes';

function loadProductsAdvancedRequest() {
    return {
        type: PRODUCTSADVANCED_LOAD_REQUEST
    };
}

function loadProductsAdvancedSuccess(prodAdv) {
    return {
        type: PRODUCTSADVANCED_LOAD_SUCCESS,
        prodAdv
    };
}

function loadProductsAdvancedFailure(err) {
    return {
        type: PRODUCTSADVANCED_LOAD_FAILURE,
        err
    };
}

export const prodByProductsCategories = (string, minPrice, maxPrice) => {
    const url = `${API_ROOT}/products/search?name=&product_category=${string}&min_price=${minPrice}&max_price=${maxPrice}&only_mobile=&size=thumb`;
    console.log(url);
    return (dispatch) => {
        dispatch(loadProductsAdvancedRequest());
        return http.get(url)
            .then((prodAdv) => {
                console.log('ENTREEEEEEEEEEEEEEEEEEEEEEEE');
                dispatch(loadProductsAdvancedSuccess(prodAdv));
                console.log(prodAdv);
                return true;
            }, (err) => dispatch(loadProductsAdvancedFailure(err))
            );
    };
};
