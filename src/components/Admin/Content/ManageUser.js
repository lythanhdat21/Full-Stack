import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import {FcPlus} from 'react-icons/fc'
import TableUser from "./TableUser"
import { useEffect, useState } from "react"
import {getAllUsers, getUserWithPaginate} from '../../../services/apiService'
import ModalUpdateUser from "./ModalUpdateUser"
import ModalViewUser from "./ModalViewUser"
import ModalDeleUser from "./ModalDeleteUser"
import TableUserPaginate from "./TableUserPaginate"

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [listUsers, setListUsers] = useState([])
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({}) // Vì data của user là kiểu object
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataDelete, setDataDelelete] = useState({})
    const LIMIT_USER = 3
    const [pageCount, setpageCount] = useState(0) // Không có người dùng thì không hiển thị thannh phân trang
    const [currentPage, setCurrentPage] = useState(1) // Người dùng đang ở trang nào

    // useEffect = componentDidMount
    useEffect (() => {
        // fetchListUsers()
        fetchListUsersWithPaginate(1) // Chúng ta sẽ lấy phần tử ở trang đầu tiên

    }, []) // hàm useEffect chỉ chạy đúng một lần

    const fetchListUsers = async() => { // get tất cả người dùng
        let res = await getAllUsers()              
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const fetchListUsersWithPaginate = async(page) => { // get người dùng theo kiểu phân trang
        let res = await getUserWithPaginate(page, LIMIT_USER)              
        if (res.EC === 0) {
            console.log('res.DT = ', res.DT)
            setListUsers(res.DT.users)
            setpageCount(res.DT.totalPages)
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
                    <TableUserPaginate
                        listUsers = {listUsers}
                        handleClickBtnUpdate = {handleClickBtnUpdate}
                        handleClickBtnView = {handleClickBtnView}
                        handleClickBtnDelete = {handleClickBtnDelete}
                        fetchListUsersWithPaginate ={fetchListUsersWithPaginate}
                        pageCount = {pageCount}
                        currentPage = {currentPage}
                        setCurrentPage = {setCurrentPage}
                    />
                </div>
                <ModalCreateUser 
                    show = {showModalCreateUser} // show = show của ModalCreateUser.js
                    setShow = {setShowModalCreateUser} // setShow = setShow của ModalCreateUser.js
                    fetchListUsers = {fetchListUsers} // fetchListUsers = fetchListUsers của ModalCreateUser.js
                    fetchListUsersWithPaginate ={fetchListUsersWithPaginate}
                    currentPage = {currentPage}
                    setCurrentPage = {setCurrentPage}
                />
                <ModalUpdateUser
                    show = {showModalUpdateUser}
                    setShow = {setShowModalUpdateUser} // setShow = setShow của ModalUpdateUser.js
                    dataUpdate = {dataUpdate}
                    fetchListUsers = {fetchListUsers} // fetchListUsers = fetchListUsers của ModalUpdateUser.js
                    resetUpdateData = {resetUpdateData}
                    fetchListUsersWithPaginate ={fetchListUsersWithPaginate}
                    currentPage = {currentPage}
                    setCurrentPage = {setCurrentPage}
                />

                <ModalViewUser
                    show = {showModalViewUser}
                    setShow = {setShowModalViewUser} // setShow = setShow của ModalViewUser.js
                    dataUpdate = {dataUpdate}
                    resetUpdateData = {resetUpdateData}
                    fetchListUsersWithPaginate ={fetchListUsersWithPaginate}
                    currentPage = {currentPage}
                    setCurrentPage = {setCurrentPage}
                />

                <ModalDeleUser
                    show = {showModalDeleteUser}
                    setShow = {setShowModalDeleteUser}
                    dataDelete = {dataDelete}
                    fetchListUsers = {fetchListUsers} // Sau khi xóa thành công, chúng ta cần gọi lại danh sách user
                    fetchListUsersWithPaginate ={fetchListUsersWithPaginate}
                    currentPage = {currentPage}
                    setCurrentPage = {setCurrentPage}
                />
            </div>
        </div>
    )
}
export default ManageUser


