import React, { useState, useEffect } from 'react'
import './DisplayInfor.scss'
import logo from './../logo.svg'

const DisplayInfor = (props) => {
    const {listUsers} = props
    const [isShowHideListUser, setShowHideListUser] = useState(true)

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser)
    }

    console.log('>>> call me render')

    useEffect (() => {

        // setTimeout(() => {
        //     document.title = "Tony & Hoi dan IT"
        // }, 3000)

        if (listUsers.length === 0) {
            alert ('You deleted all the users')
        }

        console.log('>>> call me useEffect')
    }, [listUsers])

    return(
        <div className = 'display-infor-container'>
            <div>
                <span onClick ={() => handleShowHideListUser()}>
                    {isShowHideListUser === true ? "Hide list users" : "Show list users"}                   
                </span>
            </div>

            {isShowHideListUser &&
                <>
                    {listUsers.map((user, index) => {
                        return(
                            <div key = {user.id} className = {+user.age > 25 ? "green": "red"}>
                                <div>
                                    <div>My name is {user.name}</div>
                                    <div>My age is {user.age}</div>
                                </div>
                                <div>
                                    <button onClick = {() => props.handleDeleteUser(user.id)}> Delete </button>
                                </div>
                                <hr/>
                            </div>
                        )
                    })}
                </>
            }
        </div>               
    )
}
export default DisplayInfor

