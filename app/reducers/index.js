// import {combineReducers} from 'redux';
// import AuthReducer from './auth';
// import ApplicationReducer from './application';
// import userReducer from './userReducer';

// //

// export default combineReducers({
//   auth: AuthReducer,
//   application: ApplicationReducer,
//   userReducer: userReducer
// });



import {combineReducers} from 'redux';
import AuthReducer from './auth';
import ApplicationReducer from './application';
import userReducer from './userReducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';



const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 100000,
};
// userReducer: persistReducer(persistUserConfig, Reducers.userReducer),
const persistUserConfig = {
  key: 'persist_user',
  storage: AsyncStorage,
};


const rootReducer = combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
  userReducer: persistReducer(persistUserConfig,userReducer),
});

// export default combineReducers({
//   auth: AuthReducer,
//   application: ApplicationReducer,
//   userReducer: userReducer
// });
export default rootReducer
