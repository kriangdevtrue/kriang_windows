import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
//import { persistStore, persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';



//--- by redux
let store = createStore(
                rootReducer,
                composeWithDevTools(applyMiddleware(thunk))
            );
 
export default store;

//--- by redux persist
/*const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
    let persistor = persistStore(store);
    return { store, persistor };
}*/