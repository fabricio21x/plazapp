import {
    PRODFAVOURITES_LOAD_REQUEST,
    PRODFAVOURITES_LOAD_SUCCESS,
    PRODFAVOURITES_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
	products: [],
	isFetching: false,
	error: false
};

export default productsFavouritesReducer = (state = initialState, action) => {
	switch(action.type) {
		case PRODFAVOURITES_LOAD_REQUEST:
			return {
				...state,
				products: [],
				isFetching: true
			};
		case PRODFAVOURITES_LOAD_SUCCESS:
			return {
				...state,
				products: action.products,
				isFetching: false
			};
		case PRODFAVOURITES_LOAD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		default:
			return state;
	}
}