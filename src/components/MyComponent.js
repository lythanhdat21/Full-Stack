import React from "react"
import DisplayInfor from "./DisplayInfor"
import UserInfor from "./UserInfor"

class MyComponent extends React.Component{
    render(){
        const myInfor = ['ab', 'c']
        return(
            <div>
                <UserInfor/>
                <br/><br/>
                <DisplayInfor name = "Hoi Dan IT" age = "32"/>
                <hr/>
                <DisplayInfor name = {"Tony Lee"} age = {30} myInfor = {myInfor}/>
            </div>
        )
    }
}
export default MyComponent

