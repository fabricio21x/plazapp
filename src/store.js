import {createStore, applyMiddleware} from 'redux'
import getRootReducer from './reducers'
import thunk from 'redux-thunk'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const reduxMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.navigation,
)

const middleware = [thunk, reduxMiddleware]

export default function getStore(navReducer) {

	return store = createStore(getRootReducer(navReducer), applyMiddleware(...middleware))
}

export const addListener = createReduxBoundAddListener("root");