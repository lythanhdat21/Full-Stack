import { INCREMENT, DECREMENT } from '../action/counterAction';
import { FETCH_USER_LOGIN_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: ''
    },
    isAuthenticated: false // Để biết được người dùng đã đăng nhập chưa.
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case 'FETCH_USER_LOGIN_SUCCESS': // Delete INCREMENT

        case FETCH_USER_LOGIN_SUCCESS:
            console.log('check action: ', action)
            return {
                ...state, account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role
                }, 
                isAuthenticated: true // Khi chúng ta log in thành công thì biến isAuthenticated được cập nhật là true
            };

        case DECREMENT:
            return {
                ...state, count: state.count - 1,
            };
        default: return state;
    }
};

export default userReducer;


// Đây chính là cú pháp mà chúng ta viết Reducer


