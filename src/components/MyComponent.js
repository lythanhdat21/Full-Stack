import React from "react"
import DisplayInfor from "./DisplayInfor"
import UserInfor from "./UserInfor"

class MyComponent extends React.Component{

    state = {
        listUsers: [
            {id: 1, name: "Hoi Dan IT", age: "32"},
            {id: 2, name: "Tony", age: "20"},
            {id: 3, name: "Lee", age: "25"}
        ]
    }

    render(){
        return(
            <div>
                <UserInfor/>
                <br/><br/>

                <DisplayInfor 
                listUsers = {this.state.listUsers}
                />
                {/* <hr/> */}
            </div>
        )
    }
}
export default MyComponent

