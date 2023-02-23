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
        console.log('>>> Check data from parent: ', userObj)

        this.setState({
            listUsers:[userObj, ...this.state.listUsers] // Lesson 7, cập nhật đầu dòng
            //listUsers:[...this.state.listUsers, userObj] // Lesson 7, cập nhật cuối dòng
        })
    }

    render(){
        return(
            <div>
                <AddUserInfor
                    handleAddNewUser = {this.handleAddNewUser}
                />
                <br/><br/>

                <DisplayInfor 
                    listUsers = {this.state.listUsers}
                />
            </div>
        )
    }
}
export default MyComponent

