import React from "react"
class MyComponent extends React.Component{
    state = {
        name: "Tony",
        address: "Saigon",
        age: 32
    }

    handleClick(event){
        console.log("My name is", this.state.name)
    }

    handleOnMouseOver(event){
        console.log(event.pageX)
        }
    
    // JSX
    render(){
        return(
            <div>
                My name is {this.state.name} and I'm from {this.state.address}
                <button onClick={this.handleClick}>Click me</button>
                <button onMouseOver ={this.handleOnMouseOver}>Mouse Over</button>
            </div>
        )
    }
}
export default MyComponent

