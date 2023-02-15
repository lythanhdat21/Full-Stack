import React from 'react'

class DisplayInfor extends React.Component {
    render(){
        // console.log(this.props)

        //Destructuring Array
        const {age, name} = this.props //object

        return(
            <div>

                {/* <div>My name is {this.props.name}</div>
                <div>My age's {this.props.age}</div> */}

                <div>My name is {name}</div>
                <div>My age's {age}</div>

            </div>
        )
    }
}

export default DisplayInfor



