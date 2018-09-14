import {
    PRODFAVOURITES_LOAD_REQUEST,
    PRODFAVOURITES_LOAD_SUCCESS,
    PRODFAVOURITES_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
	favProds: [],
	isFetching: false,
	error: false
};

export default favProdReducer = (state = initialState, action) => {
	switch(action.type) {
		case PRODFAVOURITES_LOAD_REQUEST:
			return {
				...state,
				favProds: [],
				isFetching: true
			};
		case PRODFAVOURITES_LOAD_SUCCESS:
			return {
				...state,
				favProds: action.favProds,
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