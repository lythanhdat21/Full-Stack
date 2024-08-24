import { useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import { changePassword } from '../../services/apiService';

const Password = (props) => {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handUpdate = async() => {
        let data = await changePassword (currentPassword, newPassword)
        console.log (data) 
        if(data && data.EC === 0) {
            toast.success(data.EM)
            await data.DT.currentPassword
            await data.DT.newPassword
        }
        if(data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <div className = "user-infor-container">
            <div className = 'row g-3'>
                <div className='col-md-6'>
                    <label className = "form-label">Current Password</label>
                    <input
                        type = "text"
                        className='form-control'
                        value = {currentPassword}
                        onChange = {(event) => setCurrentPassword(event.target.value)}
                    />
                </div>           
                <div className='col-md-6'>
                    <label className = "form-label">New Password</label>
                    <input
                        type = "text"
                        className='form-control'
                        value = {newPassword}
                        onChange = {(event) => setNewPassword(event.target.value)}
                    />
                </div>
                <div className='col-md-6'>
                    <label className = "form-label">Confirm Password</label>
                    <input 
                        type = "text"
                        className = 'form-control'
                        onChange = {(event) => setConfirmPassword(event.target.value)}
                        value = {confirmPassword}
                    >
                    </input>
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
export default Password


