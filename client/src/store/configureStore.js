import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import userReducer from '../reducers/user';
import searchReducer from '../reducers/search';
import filtersReducer from '../reducers/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    search: searchReducer,
    filters: filtersReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    const store = createStore(
        persistedReducer,
        composeEnhancers(applyMiddleware(thunk))
    );
    const persistor = persistStore(store);
    return { store, persistor };
};    