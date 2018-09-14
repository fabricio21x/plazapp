import {
    PREFERENCESCAT_LOAD_REQUEST,
    PREFERENCESCAT_LOAD_SUCCESS,
    PREFERENCESCAT_LOAD_FAILURE,
    PREFERENCESCAT_INSERT_REQUEST,
    PREFERENCESCAT_INSERT_SUCCESS,
    PREFERENCESCAT_INSERT_FAILURE
} from '../constants/actiontypes';

const initialState = {
	prefCategories: null,
	isFetching: false,
	error: false
};

export default preferencesCatReducer = (state = initialState, action) => {
	switch (action.type) {
		case PREFERENCESCAT_LOAD_REQUEST:
			return {
				...state,
				prefCategories: null,
				isFetching: true
			};
		case PREFERENCESCAT_LOAD_SUCCESS:
			return {
				...state,
				prefCategories: action.preferencesCat,
				isFetching: false
			};
		case PREFERENCESCAT_LOAD_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
            };
        case PREFERENCESCAT_INSERT_REQUEST:
            return {
                ...state,
				prefCategories: null,
				isFetching: true
            };
        case PREFERENCESCAT_INSERT_SUCCESS:
            return {
                ...state,
				prefCategories: action.preferencesCat,
				isFetching: false
            };
        case PREFERENCESCAT_INSERT_FAILURE:
            return {
                ...state,
				isFetching: false,
				error: true
            };    
		default:
			return state;
	}
}