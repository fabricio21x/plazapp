import {API_ROOT} from './../constants/config.js';
import http from './../utils/http.js';
import {
    PROFILE_LOAD_REQUEST,
    PROFILE_LOAD_SUCCESS,
    PROFILE_LOAD_FAILURE,
    PROFILE_EDIT_REQUEST,
    PROFILE_EDIT_SUCCESS,
    PROFILE_EDIT_FAILURE
} from '../constants/actiontypes';

function loadProfileRequest() {
    return {
        type: PROFILE_LOAD_REQUEST
    }
}

function loadProfileSuccess(profile) {
    return {
        type: PROFILE_LOAD_SUCCESS,
        profile
    }
}

function loadProfileFailure(err) {
    return {
        type: PROFILE_LOAD_FAILURE,
        err
    }
}

function editProfileRequest() {
    return {
        type: PROFILE_EDIT_REQUEST
    }
}

function editProfileSuccess(profile) {
    return {
        type: PROFILE_EDIT_SUCCESS,
        profile
    }
}

function editProfileFailure(err) {
    return {
        type: PROFILE_EDIT_FAILURE,
        err
    }
}
export const loadProfile = () => {
    const url = `${API_ROOT}/users/me`;
    console.log(url);
    return (dispatch)=>{
        dispatch(loadProfileRequest());
        return http.get(url)
        .then((profile)=>{
            dispatch(loadProfileSuccess(profile));
            return true;
        }, (err)=>dispatch(loadProfileFailure(err))
        )
    }
}

export const editProfile = () => {
    const url = `${API_ROOT}/users/profile`;
    console.log(url);
    return (dispatch)=>{
        fetch(editProfileRequest());
        return http.get(url)
        .then((profile)=>{
            dispatch(ediProfileSuccess(profile));
            return true;
        }, (err)=>dispatch(editProfileFailure(err))
        )
    }
}

