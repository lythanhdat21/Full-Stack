import { FcPlus } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import { useTranslation } from 'react-i18next';
import './Share.scss';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
import { updateProfile } from '../../services/apiService';

const UserInfor = (props) => {
    // Không truyền data từ component cha sang component con nữa. Mà chúng ta lấy trực tiếp từ Redux
    const account = useSelector(state => state.user.account) 

    const { t } = useTranslation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState ("USER")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    useEffect (() => {
        if (account && !_.isEmpty(account)) {
            setEmail(account.email)
            setUsername(account.username)
            setRole(account.role)
            setImage("")
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64, ${account.image}`)
            }
        }
    }, [account]) // Khi biến account thay đổi thì useEffect sẽ reset lại giá trị đầu vào.

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("")
        }
    }

    const handUpdate = async() => { // update không được
        let data = await updateProfile (username, image)
        // console.log (data.DT.username)
        // console.log (data.DT.image) 
        if(data && data.EC === 0) {
            toast.success(data.EM)
            await data.DT.username
        }
        if(data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <div className = "user-infor-container">
            <div className = 'row g-3'>
                <div className='col-md-4'>
                    <label className = "form-label">Username</label>
                    <input
                        type = "text"
                        className='form-control'
                        value = {username}
                        onChange = {(event) => setUsername(event.target.value)}
                    />
                </div>           
                <div className='col-md-4'>
                    <label className = "form-label">Email</label>
                    <input
                        disabled
                        type = "email"
                        className='form-control'
                        value = {email}
                        onChange = {(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='col-md-4'>
                    <label className = "form-label">
                        {t('admin.manage-users.modal.role')}
                    </label>
                    <select className = 'form-select'
                        onChange = {(event) => setRole(event.target.value)}
                        value = {role}
                        disabled
                    >
                        <option value = "USER">USER</option>
                    </select>
                </div>
                <div className= 'col-md-12'>
                    <label className = 'form-label label-upload' htmlFor='labelUpload'>
                        <FcPlus/>
                        Upload File Image
                    </label>
                    <input
                        type = "file"
                        id = "labelUpload" hidden
                        onChange = {(event) => handleUploadImage(event)}
                    />
                </div>
                <div className = 'col-md-12 img-preview'>
                    {previewImage ?
                        <img src = {previewImage} />
                        :
                        <span>
                            Preview Image
                        </span>
                    }
                </div>
                <div className='mt-3'>
                    <button 
                        className = "btn btn-warning"
                        onClick={() => handUpdate()}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}
export default UserInfor


