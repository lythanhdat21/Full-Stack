import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import {FcPlus} from 'react-icons/fc'
import TableUser from "./TableUser"
import { useEffect, useState } from "react"
import {getAllUsers} from '../../../services/apiService'

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [listUsers, setListUsers] = useState([])

    // useEffect = componentDidMount
    useEffect (() => {
        fetchListUsers()
    }, []) // hàm useEffect chỉ chạy đúng một lần

    const fetchListUsers = async() => {
        let res = await getAllUsers()              
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    return (
        <div className = "manage-user-container">
            <div className = "title">
                Manage User
            </div>
            <div className = "users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" 
                        onClick = {() => setShowModalCreateUser(true)}> 
                            <FcPlus/> Add new users
                    </button>
                </div>
                <div className="table-users-container">
                    <TableUser 
                        listUsers = {listUsers} // listUsers = listUsers của TableUser.js
                    />
                </div>
                <ModalCreateUser 
                    show = {showModalCreateUser} // show = show của ModalCreateUser.js
                    setShow = {setShowModalCreateUser} // setShow = setShow của ModalCreateUser.js
                    fetchListUsers = {fetchListUsers} // fetchListUsers = fetchListUsers của ModalCreateUser.js
                />
            </div>
        </div>
    )
}
export default ManageUser


