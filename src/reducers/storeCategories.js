import {
    CATEGORIES_LOAD_REQUEST,
    CATEGORIES_LOAD_SUCCESS,
    CATEGORIES_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
	categories: [],
	isFetching: false,
	error: false
};

export default categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case CATEGORIES_LOAD_REQUEST:
			return {
				...state,
				categories: [],
				isFetching: true
			};
		case CATEGORIES_LOAD_SUCCESS:
			return {
				...state,
				categories: action.categories,
				isFetching: false
			};
		case CATEGORIES_LOAD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		default:
			return state;
	}
}