import { combineReducers } from 'redux';

import storesReducer from './stores';
import categoriesReducer from './storeCategories';
import mapsReducer from './maps';
import prodCategoriesReducer from './productCategories';
import preferencesCatReducer from './preferencesCateg';
import bannersReducer from './bannersReducer';
import productsReducer from './productsReducer';
import productFavouritesReducer from './productFavouritesReducer';
import storeInfoReducer from './storeInfo';
import profileReducer from './profileReducer';
import routesReducer from './routes';
import favProdReducer from './favProd';
import eventsReducer from './eventsReducer';
import advProdReducer from './productsAdvanced';
import recommendedCategoriesReducer from './recommendedCategoriesReducer';
import achievementsReducer from './achievementsReducer';
import bathroomsReducer from './bathrooms';
import helpcenterReducer from './helpcenter';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        storesReducer,
        storeInfoReducer,
        categoriesReducer,
        prodCategoriesReducer,
        preferencesCatReducer,
        bannersReducer,
        productsReducer,
        productFavouritesReducer,
        mapsReducer,
        profileReducer,
        routesReducer,
        favProdReducer,
        eventsReducer,
        advProdReducer,
        recommendedCategoriesReducer,
        achievementsReducer,
        bathroomsReducer,
        helpcenterReducer
    });
}
