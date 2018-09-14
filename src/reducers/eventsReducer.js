import {
    EVENTS_LOAD_REQUEST,
    EVENTS_LOAD_SUCCESS,
    EVENTS_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
	events: [],
	isFetching: false,
	error: false
};

export default eventsReducer = (state = initialState, action) => {
	switch(action.type) {
		case EVENTS_LOAD_REQUEST:
			return {
				...state,
				events: [],
				isFetching: true
			};
		case EVENTS_LOAD_SUCCESS:
			return {
				...state,
				events: action.events,
				isFetching: false
			};
		case EVENTS_LOAD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		default:
			return state;
	}
}