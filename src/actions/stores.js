import {API_ROOT_WAZE} from './../constants/config.js';
import http from './../utils/http.js';
import {
    STORES_LOAD_REQUEST,
    STORES_LOAD_SUCCESS,
    STORES_LOAD_FAILURE
} from '../constants/actiontypes';

function loadStoresRequest() {
    return {
        type: STORES_LOAD_REQUEST
    }
}

function loadStoresSuccess(stores) {
    return {
        type: STORES_LOAD_SUCCESS,
        stores
    }
}

function loadStoresFailure(err) {
    return {
        type: STORES_LOAD_FAILURE,
        err
    }
}

export const loadStores = (categories = '') => {
    const ids = (categories != '') ? categories.toString() : categories;
    console.log(ids);
    const url = `${API_ROOT_WAZE}/stores/search?store_category=${ids}`;
    console.log(url);
    return (dispatch)=>{
        dispatch(loadStoresRequest());
        return http.get(url)
        .then((stores)=>{
            dispatch(loadStoresSuccess(stores));
            return true;
        }, (err)=>dispatch(loadStoresFailure(err))
        )
    }
}
