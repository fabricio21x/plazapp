import {API_ROOT_WAZE} from './../constants/config.js';
import http from './../utils/http.js';
import {
    ROUTE_LOAD_REQUEST,
    ROUTE_LOAD_SUCCESS,
    ROUTE_LOAD_FAILURE
} from '../constants/actiontypes';

function loadRouteRequest() {
    return {
        type: ROUTE_LOAD_REQUEST
    }
}

function loadRouteSuccess(route) {
    return {
        type: ROUTE_LOAD_SUCCESS,
        route
    }
}

function loadRouteFailure(err) {
    return {
        type: ROUTE_LOAD_FAILURE,
        err
    }
}

export const loadRoute = (data) => {
    const url = `${API_ROOT_WAZE}/search/store-store`;
    return (dispatch)=>{
        dispatch(loadRouteRequest());
        return http.post(url, data)
        .then((route)=>{
            dispatch(loadRouteSuccess(route));
            return true;
        }, (err)=>dispatch(loadRouteFailure(err))
        )
    }
}
