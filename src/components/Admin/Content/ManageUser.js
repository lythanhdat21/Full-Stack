import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import {FcPlus} from 'react-icons/fc'
import {useState} from "react"
import TableUser from "./TableUser"

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

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
                    {/* table users */}

                    <TableUser/>
                </div>
                <ModalCreateUser 
                    show = {showModalCreateUser} // show = show của ModalCreateUser.js
                    setShow = {setShowModalCreateUser} // setShow = setShow của ModalCreateUser.js
                />
            </div>
        </div>
    )
}
export default ManageUser


