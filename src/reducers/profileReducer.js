import {
    PROFILE_LOAD_REQUEST,
    PROFILE_LOAD_SUCCESS,
    PROFILE_LOAD_FAILURE,
    PROFILE_EDIT_REQUEST,
    PROFILE_EDIT_SUCCESS,
    PROFILE_EDIT_FAILURE
} from '../constants/actiontypes';

const initialState = {
	profile: [],
	isFetching: false,
	error: false
};

export default profileReducer = (state = initialState, action) => {
	switch(action.type) {
		case PROFILE_LOAD_REQUEST:
			return {
				...state,
				profile: [],
				isFetching: true
			};
		case PROFILE_LOAD_SUCCESS:
			return {
				...state,
				profile: action.profile,
				isFetching: false
			};
		case PROFILE_LOAD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		case PROFILE_EDIT_REQUEST:
			return {
				...state,
				profile: [],
				isFetching: true
			};
		case PROFILE_EDIT_SUCCESS:
			return {
				...state,
				profile: action.profile,
				isFetching: false
			};
		case PROFILE_EDIT_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		default:
			return state;
	}
}