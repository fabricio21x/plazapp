import {
    ACHIEVEMENTS_LOAD_REQUEST,
    ACHIEVEMENTS_LOAD_SUCCESS,
    ACHIEVEMENTS_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
	achievements: [],
	isFetching: false,
	error: false
};

export default achievementsReducer = (state = initialState, action) => {
	switch(action.type) {
		case ACHIEVEMENTS_LOAD_REQUEST:
			return {
				...state,
				achievements: [],
				isFetching: true
			};
		case ACHIEVEMENTS_LOAD_SUCCESS:
			return {
				...state,
				achievements: action.achievements,
				isFetching: false
			};
		case ACHIEVEMENTS_LOAD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		default:
			return state;
	}
}