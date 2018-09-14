import {
    INCIDENTS_CATEGORIES,
    INCIDENTS_LOAD_REQUEST,
    INCIDENTS_LOAD_SUCCESS,
    INCIDENTS_LOAD_FAILURE,
    INCIDENTS_INSERT_REQUEST,
    INCIDENTS_INSERT_SUCCESS,
    INCIDENTS_INSERT_FAILURE
} from '../constants/actiontypes';

const initialState = {
	incidents: [],
	isFetching: false,
	error: false,
	categories: []
};

export default incidentsReducer = (state = initialState, action={}) => {
	switch (action.type) {
		case INCIDENTS_CATEGORIES:
			return {
				...state,
				incidents: [],
				isFetching: true
			};
		case INCIDENTS_LOAD_REQUEST:
			return {
				...state,
				incidents: [],
				isFetching: true
			};
		case INCIDENTS_LOAD_SUCCESS:
			return {
				...state,
				incidents: action.incidents,
				isFetching: false
			};
		case INCIDENTS_LOAD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		case INCIDENTS_INSERT_REQUEST:
			return {
				...state,
				isFetching: true
			};
		case INCIDENTS_INSERT_SUCCESS:
			return {
				...state,
				isFetching: false
			};
		case INCIDENTS_INSERT_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};	
		default:
			return state;
	}
}