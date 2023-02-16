import React from 'react'

class DisplayInfor extends React.Component {
    render(){

        //Destructuring Array/object
        // const {age, name} = this.props //object
        const {listUser} = this.props
        console.log(listUser)

        return(
            <div>
                {listUser.map((user, index) => {
                    return(
                        <div key = {user.id}>
                            <div>My name is {user.name}</div>
                            <div>My age is {user.age}</div>
                            <hr/>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default DisplayInfor



