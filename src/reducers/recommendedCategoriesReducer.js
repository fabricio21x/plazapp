import {
    RECOMMENDEDCATEGORIES_LOAD_REQUEST,
    RECOMMENDEDCATEGORIES_LOAD_SUCCESS,
    RECOMMENDEDCATEGORIES_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
	prefCategories: null,
	isFetching: false,
	error: false
};

export default recommendedCategoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case RECOMMENDEDCATEGORIES_LOAD_REQUEST:
			return {
				...state,
				prefCategories: null,
				isFetching: true
			};
		case RECOMMENDEDCATEGORIES_LOAD_SUCCESS:
			return {
				...state,
				prefCategories: action.recommendedCategories,
				isFetching: false
			};
		case RECOMMENDEDCATEGORIES_LOAD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
            };
		default:
			return state;
	}
}