import React from "react"
import DisplayInfor from "./DisplayInfor"
import AddUserInfor from "./AddUserInfor"

class MyComponent extends React.Component{

    state = {
        listUsers: [
            {id: 1, name: "Hoi Dan IT", age: "32"},
            {id: 2, name: "Tony", age: "20"},
            {id: 3, name: "Lee", age: "25"}
        ]
    }

    handleAddNewUser = (userObj) => {

        this.setState({
            listUsers:[userObj, ...this.state.listUsers] // Lesson 7, cập nhật đầu dòng
        })
    }

    handleDeleteUser = (userId) => {
        let listUsersClone = this.state.listUsers
        listUsersClone = listUsersClone.filter(item => item.id !== userId) // xoá id trùng với id truyền vào
        this.setState({
            listUsers: listUsersClone
        })
    }

    render(){     

        return(
            <>
                <div className ='a'>
                    <AddUserInfor
                        handleAddNewUser = {this.handleAddNewUser}
                    />
                    <br/><br/>

                    <DisplayInfor 
                        listUsers = {this.state.listUsers}
                        handleDeleteUser = {this.handleDeleteUser}
                    />
                </div>
                <div className = 'b'>

                </div>
            </>
        )
    }
}

export default MyComponent

