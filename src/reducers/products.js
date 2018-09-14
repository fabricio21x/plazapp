import {
    PRODUCTS_LOAD_REQUEST,
    PRODUCTS_LOAD_SUCCESS,
    PRODUCTS_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
	products: [],
	isFetching: false,
	error: false
};

export default productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRODUCTS_LOAD_REQUEST:
			return {
				...state,
				products: [],
				isFetching: true
			};
		case PRODUCTS_LOAD_SUCCESS:
			return {
				...state,
				products: action.products,
				isFetching: false
			};
		case PRODUCTS_LOAD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		default:
			return state;
	}
}