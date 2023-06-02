import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import {FcPlus} from 'react-icons/fc'
import TableUser from "./TableUser"
import { useEffect, useState } from "react"
import {getAllUsers} from '../../../services/apiService'
import ModalUpdateUser from "./ModalUpdateUser"
import ModalViewUser from "./ModalViewUser"
import ModalDeleUser from "./ModalDeleteUser"

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [listUsers, setListUsers] = useState([])
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({}) // Vì data của user là kiểu object
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataDelete, setDataDelelete] = useState({})

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
    }

    const resetUpdateData = () =>{
        setDataUpdate({})
    }

    const handleClickBtnView = (user) => {
        setShowModalViewUser (true)
        setDataUpdate(user)
    }

    const handleClickBtnDelete =(user) => {
        // console.log("Data Delete: ", user)
        setShowModalDeleteUser (true)
        setDataDelelete(user)
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
                        handleClickBtnView = {handleClickBtnView}
                        handleClickBtnDelete = {handleClickBtnDelete}
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
                    fetchListUsers = {fetchListUsers} // fetchListUsers = fetchListUsers của ModalUpdateUser.js
                    resetUpdateData = {resetUpdateData}
                />

                <ModalViewUser
                    show = {showModalViewUser}
                    setShow = {setShowModalViewUser} // setShow = setShow của ModalViewUser.js
                    dataUpdate = {dataUpdate}
                    resetUpdateData = {resetUpdateData}
                />
                <ModalDeleUser
                    show = {showModalDeleteUser}
                    setShow = {setShowModalDeleteUser}
                    dataDelete = {dataDelete}
                />
            </div>
        </div>
    )
}
export default ManageUser


