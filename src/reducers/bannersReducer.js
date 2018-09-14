import {
    BANNERS_LOAD_REQUEST,
    BANNERS_LOAD_SUCCESS,
    BANNERS_LOAD_FAILURE
} from '../constants/actiontypes';

const initialState = {
	banners: [],
	isFetching: false,
	error: false
};

export default bannersReducer = (state = initialState, action) => {
	switch(action.type) {
		case BANNERS_LOAD_REQUEST:
			return {
				...state,
				banners: [],
				isFetching: true
			};
		case BANNERS_LOAD_SUCCESS:
			return {
				...state,
				banners: action.banners,
				isFetching: false
			};
		case BANNERS_LOAD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		default:
			return state;
	}
}