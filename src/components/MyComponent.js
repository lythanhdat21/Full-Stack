import React from "react"
class MyComponent extends React.Component{
    state = {
        name: "Tony",
        address: "Saigon",
        age: 32
    }

    handleClick = (event)=>{
        // console.log("My name is", this.state.name)
        // console.log("radom ", Math.floor((Math.random()*100) + 1))
        
        // merge State => react class
        this.setState({
            name: "Lee",
            age: Math.floor((Math.random()*100) + 1)
        })

        // this.setState({
        //     age: Math.floor((Math.random()*100) + 1)
        // })
    }

    handleOnMouseOver(event){
        console.log(event.pageX)
        }
    
    // JSX
    render(){
        return(
            <div>
                {/* My name is {this.state.name} and I'm from {this.state.address} */}
                My name is {this.state.name} and I'm from {this.state.age}

                <button onClick = {(event) =>{this.handleClick(event)}}>Click me</button>
                <button onMouseOver ={this.handleOnMouseOver}>Mouse Over</button>
            </div>
        )
    }
}
export default MyComponent

