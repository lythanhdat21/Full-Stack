import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;

// Quy định các thông tin sẽ lưu (thông qua reducer) và cấu hình cho redux (middleware như redux devtool, redux thunk…)
