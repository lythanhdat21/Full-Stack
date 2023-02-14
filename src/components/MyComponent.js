import React from "react"
import UserInfor from "./UserInfor"
class MyComponent extends React.Component{

    // state = {
    //     name: "Tony",
    //     address: "Saigon",
    //     age: 32
    // }

    // // handleClick = (event)=>{
        
    // //     // merge State => react class
    // //     this.setState({
    // //         name: "Lee",
    // //         age: Math.floor((Math.random()*100) + 1)
    // //     })
    // // }

    // // handleOnMouseOver(event){
    // //     console.log(event.pageX)
    // //     }
    
    // handleOnChangeInput = (event) => {
    //     this.setState({
    //         name: event.target.value
    //     })
    // }

    // handleOnChangeAge = (event) => {
    //     this.setState({
    //         age: event.target.value
    //     })
    // }

    // handleOnSubmit = (event) => {
    //     event.preventDefault()
    //     console.log(this.state)
    // }

    // JSX
    render(){
        return(
            <div>

                {/* My name is {this.state.name} and I'm {this.state.age} years old.
                <form onSubmit ={(event) => this.handleOnSubmit(event)}>
                    <label>Your name: </label>
                    <input 
                        value = {this.state.name}
                        type = "text" 
                        onChange={(event) => this.handleOnChangeInput(event)}
                    />

                    <label>Your name: </label>
                    <input 
                        value = {this.state.age}
                        type = "text" 
                        onChange={(event) => this.handleOnChangeAge(event)}
                    />

                    <button>Submit</button>
                </form> */}

                {/* <UserInfor></UserInfor> hoặc: */}
                <UserInfor/>

            </div>
        )
    }
}
export default MyComponent

