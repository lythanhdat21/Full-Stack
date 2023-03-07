import React, {useState} from 'react'

const AddUserInfor = (props) => {

    const [name, setName] = useState("")
    const [address, setAddress] = useState("Saigon")
    const [age, setAge] = useState("")

    // state = {
    //     name: "",
    //     address: "Saigon",
    //     age: ''
    // }
    
    const handleOnChangeInput = (event) => {
        setName(event.target.value)
    }

    // handleOnChangeInput = (event) => {
    //     this.setState({
    //         name: event.target.value
    //     })
    // }

    const handleOnChangeAge = (event) => {
            setAge(event.target.value)
    }

    // handleOnChangeAge = (event) => {
    //     this.setState({
    //         age: event.target.value
    //     })
    // }

    const handleOnSubmit = (event) => {
        event.preventDefault()

        props.handleAddNewUser({
            id: Math.floor((Math.random()*100) + 1) + '-random',
            name: name,
            age: age
        })
    }

    // handleOnSubmit = (event) => {
    //     event.preventDefault()

    //     this.props.handleAddNewUser({
    //         id: Math.floor((Math.random()*100) + 1) + '-random',
    //         name: this.state.name,
    //         age: this.state.age
    //     })
    // }

    return(
        <div>               
            My name is {name} and I'm {age} years old. {/*Delete double keyword "this.state." */}
            <form onSubmit ={(event) => handleOnSubmit(event)}> {/*Delete keyword "this."*/}
                <label>Your name: </label>
                <input 
                    value = {name} // Delete keyword "this.state."
                    type = "text" 
                    onChange={(event) => handleOnChangeInput(event)} // Delete keyword "this."
                />
                <label>Your age: </label>
                <input 
                    value = {age} // Delete keyword "this.state."
                    type = "text" 
                    onChange={(event) => handleOnChangeAge(event)} // Delete keyword "this."
                />
                <button>Submit</button>
            </form>
        </div>
    )
}
export default AddUserInfor

// class AddUserInfor extends React.Component{

//     state = {
//         name: "",
//         address: "Saigon",
//         age: ''
//     }
    
//     handleOnChangeInput = (event) => {
//         this.setState({
//             name: event.target.value
//         })
//     }

//     handleOnChangeAge = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//     }

//     handleOnSubmit = (event) => {
//         event.preventDefault()
//         // console.log(this.state)

//         this.props.handleAddNewUser({
//             // id: 'hardcode',
//             // name: 'Tony',
//             // age: '32'

//             id: Math.floor((Math.random()*100) + 1) + '-random',
//             name: this.state.name,
//             age: this.state.age
//         })
//     }

//     render(){
//         return(
//             <div>               
//                 My name is {this.state.name} and I'm {this.state.age} years old.
//                 <form onSubmit ={(event) => this.handleOnSubmit(event)}>
//                     <label>Your name: </label>
//                     <input 
//                         value = {this.state.name}
//                         type = "text" 
//                         onChange={(event) => this.handleOnChangeInput(event)}
//                     />

//                     <label>Your age: </label>
//                     <input 
//                         value = {this.state.age}
//                         type = "text" 
//                         onChange={(event) => this.handleOnChangeAge(event)}
//                     />

//                     <button>Submit</button>
//                 </form>

//             </div>
//         )
//     }
// }

// export default AddUserInfor



