import {
    PRODUCTSADVANCED_LOAD_REQUEST,
    PRODUCTSADVANCED_LOAD_SUCCESS,
    PRODUCTSADVANCED_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
	prodAdv: [],
	isFetching: false,
	error: false
};

export default advProdReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRODUCTSADVANCED_LOAD_REQUEST:
			return {
				...state,
				prodAdv: [],
				isFetching: true
			};
		case PRODUCTSADVANCED_LOAD_SUCCESS:
			return {
				...state,
				prodAdv: action.prodAdv,
				isFetching: false
			};
		case PRODUCTSADVANCED_LOAD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		default:
			return state;
	}
}