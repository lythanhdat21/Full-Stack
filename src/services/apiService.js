import axios from '../utils/axiosCustomize' // Delete axios

const postCreateNewUser = (email, password, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data) // Delete http://localhost:8081/
}
export {postCreateNewUser} // Vì chúng ta muốn export ra nhiều biến

