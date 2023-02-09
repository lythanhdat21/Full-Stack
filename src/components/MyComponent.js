import React from "react"
class MyComponent extends React.Component{
    state = {
        name: "Tony",
        address: "Saigon",
        age: 32
    }
    
    // JSX
    render(){
        return(
            <div>
            My name is {this.state.name} and from {this.state.address}
            </div>
        )
    }
}
export default MyComponent


