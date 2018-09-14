import {
    PRODCATEGORIES_LOAD_REQUEST,
    PRODCATEGORIES_LOAD_SUCCESS,
    PRODCATEGORIES_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
	prodCategories: [],
	isFetching: false,
	error: false
};

export default prodCategoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRODCATEGORIES_LOAD_REQUEST:
			return {
				...state,
				prodCategories: [],
				isFetching: true
			};
		case PRODCATEGORIES_LOAD_SUCCESS:
			return {
				...state,
				prodCategories: action.prodCategories,
				isFetching: false
			};
		case PRODCATEGORIES_LOAD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		default:
			return state;
	}
}