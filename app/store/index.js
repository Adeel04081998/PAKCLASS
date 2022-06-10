// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {createStore, applyMiddleware} from 'redux';
// import {persistStore, persistReducer} from 'redux-persist';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import rootReducer from '../reducers/index';
// // import userReducer from '../reducers/userReducer';

// /**
//  * Redux Setting
//  */
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   timeout: 100000,
// };


// let middleware = [thunk];
// if (process.env.NODE_ENV === `development`) {
//   middleware.push(logger);
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(persistedReducer, applyMiddleware(...middleware));
// const persistor = persistStore(store);

// export {store, persistor};

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';

/**
 * Redux Setting
 */
let middleware = [thunk];
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export {store, persistor};



// import { createStore } from 'redux';
// import { persistStore } from 'redux-persist';
// import rootReducer from '../reducers/rootReducer';
// export const store = createStore(
//     rootReducer,
//     {},
// )
// export const persistor = persistStore(store);
