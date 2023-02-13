import React from "react"
class MyComponent extends React.Component{
    state = {
        name: "Tony",
        address: "Saigon",
        age: 32
    }

    handleClick = (event)=>{
        
        // merge State => react class
        this.setState({
            name: "Lee",
            age: Math.floor((Math.random()*100) + 1)
        })
    }

    handleOnMouseOver(event){
        console.log(event.pageX)
        }
    
    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
    }

    // JSX
    render(){
        return(
            <div>
                My name is {this.state.name} and I'm {this.state.age} years old.
                <form onSubmit ={(event) => this.handleOnSubmit(event)}>
                    <input type = "text" onChange={(event) => this.handleOnChangeInput(event)}/>
                    <button>Submit</button>
                </form>

            </div>
        )
    }
}
export default MyComponent

