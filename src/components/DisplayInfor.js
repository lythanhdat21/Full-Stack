import React from 'react'
import './DisplayInfor.scss'
import logo from './../logo.svg'

class DisplayInfor extends React.Component {

    state = {
        isShowListUser: true
    }

    handleShowHide = () =>{

        this.setState({
            isShowListUser: !this.state.isShowListUser

        })
    }

    render(){

        //Destructuring Array/object
        const {listUsers} = this.props

        return(
            <div className = 'display-infor-container'>             
                <div onClick = {() => {this.handleShowHide()}}>
                    {this.state.isShowListUser === true ? "Hide list users": "Show list users"}
                </div>

                {this.state.isShowListUser &&
                    <div>
                        {listUsers.map((user, index) => {

                            return(
                                <div key = {user.id} className = {+user.age > 25 ? "green": "red"}>
                                    <div>My name is {user.name}</div>
                                    <div>My age is {user.age}</div>
                                    <div>
                                        <button onClick = {() => this.props.handleDeleteUser(user.id)}> Delete </button>
                                    </div>
                                    <hr/>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>               
        )
    }
}
export default DisplayInfor



