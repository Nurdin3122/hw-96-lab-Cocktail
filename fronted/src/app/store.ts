import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import {UserReducer} from "../Components/User/UserSlice";
import { CocktailReducer } from "../Components/Cocktails/CocktailsSlice";


const usersPersistConfig = {
    key: 'cocktail-app:user',
    storage,
    whitelist: ['user'],
};
const rootReducer = combineReducers({
    user: persistReducer(usersPersistConfig, UserReducer),
    cocktail:CocktailReducer,
});

export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;