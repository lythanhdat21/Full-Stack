import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import {FcPlus} from 'react-icons/fc'
import TableUser from "./TableUser"
import { useEffect, useState } from "react"
import {getAllUsers} from '../../../services/apiService'
import ModalUpdateUser from "./ModalUpdateUser"

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [listUsers, setListUsers] = useState([])
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({}) // Vì data của user là kiểu object

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

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser (true)
        setDataUpdate(user)
        // console.log(user)
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
                        handleClickBtnUpdate = {handleClickBtnUpdate}
                    />
                </div>
                <ModalCreateUser 
                    show = {showModalCreateUser} // show = show của ModalCreateUser.js
                    setShow = {setShowModalCreateUser} // setShow = setShow của ModalCreateUser.js
                    fetchListUsers = {fetchListUsers} // fetchListUsers = fetchListUsers của ModalCreateUser.js
                />
                <ModalUpdateUser
                    show = {showModalUpdateUser}
                    setShow = {setShowModalUpdateUser} // setShow = setShow của ModalUpdateUser.js
                    dataUpdate = {dataUpdate}
                />
            </div>
        </div>
    )
}
export default ManageUser
