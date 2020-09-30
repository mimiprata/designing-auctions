// IMPORT PACKAGE REFERENCES

import {createStore, applyMiddleware, compose} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// IMPORT MIDDLEWARE

import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

// IMPORT REDUCERS

import {reducers, rootReducer} from "./reducers";
import {appMidleware} from "./middleware/app";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// CONFIGURE STORE

/*
export const createAppStore = () => {
    return createStore(reducers,composeEnhancers( applyMiddleware(thunk, promiseMiddleware),autoRehydrate()));
};*/



const persistConfig = {
 key: 'root',
 storage: storage,
 whitelist: ['auctionType', 'authData']
};
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer,composeEnhancers( applyMiddleware(...appMidleware)));
 //persistStore(store, { whitelist: ['auctionType', 'authData', 'activeAuction'] });

export const persistor = persistStore(store);

export default store;