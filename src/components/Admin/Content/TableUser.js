import { useEffect, useState } from "react"
import {getAllUsers} from '../../../services/apiService'

const TableUser = (props) => {
    const [listUsers, setListUsers] = useState([])


    // useEffect = componentDidMount
    // useEffect (async () => {
    //     let res = await getAllUsers()
    //     console.log(res)
    // }, []) // hàm useEffect chỉ chạy đúng một lần

    useEffect (() => {
        fetchListUsers()
    }, []) // hàm useEffect chỉ chạy đúng một lần

    const fetchListUsers = async() => {
        let res = await getAllUsers()
        // console.log(res)
        
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    // console.log('render view')

    return(
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return(
                                <tr key = {`table-users-${index}`}> {/*Để tăng hiệu năng ứng dụng React, key sẽ không bị trùng với index*/}
                                    <th>{index + 1}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary">View</button> {/*class của Bootstrap */}
                                        <button className="btn btn-warning mx-3">Update</button> {/*mx-3: margin left và margin right: 3px */}
                                        <button className = "btn btn-danger">Delete</button> {/*class của Bootstrap */}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 && 
                        <tr>
                            <td colSpan = {'4'}>
                                Not found data
                            </td>
                        </tr>
                    }
                </tbody>
            </table>        
        </>
    )
}
export default TableUser


