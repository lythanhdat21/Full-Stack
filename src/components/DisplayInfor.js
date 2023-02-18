import React from 'react'

class DisplayInfor extends React.Component {

    state = {
        isShowListUser: true
    }

    handleShowHide = () =>{

        this.setState({
            // isShowListUser: false
            isShowListUser: !this.state.isShowListUser

        })
    }

    render(){

        //Destructuring Array/object
        const {listUsers} = this.props

        return(
            <div>
                <div onClick = {() => {this.handleShowHide()}}>
                    {this.state.isShowListUser === true ? "Hide list users": "Show list users"}
                </div>

                {this.state.isShowListUser &&
                    <div>
                        {listUsers.map((user, index) => {
                            // console.log(">>> check map user", user)

                                return(
                                    <div key = {user.id} className = {+user.age > 25 ? "green": "red"}>
                                        <div>My name is {user.name}</div>
                                        <div>My age is {user.age}</div>
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



