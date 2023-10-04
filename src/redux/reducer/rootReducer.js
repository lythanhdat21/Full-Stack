import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer
});

export default rootReducer;

// rootReducer giúp chúng ta nạp những reducer vào trong ứng dụng Redux, và giúp Redux biết được sự tồn tại của Reducer