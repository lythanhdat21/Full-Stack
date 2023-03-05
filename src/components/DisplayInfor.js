import React from 'react'
import './DisplayInfor.scss'
import logo from './../logo.svg'

const DisplayInfor = (props) => {
    const {listUsers} = props // detele: this
        return(
            <div className = 'display-infor-container'>             
                {true &&
                    <>
                        {listUsers.map((user, index) => {
                            return(
                                <div key = {user.id} className = {+user.age > 25 ? "green": "red"}>
                                    <div>
                                        <div>My name is {user.name}</div>
                                        <div>My age is {user.age}</div>
                                    </div>
                                    <div>
                                        <button onClick = {() => props.handleDeleteUser(user.id)}> Delete </button>
                                    </div>
                                    <hr/>
                                </div>
                            )
                        })}
                    </>
                }
            </div>               
        )
}
export default DisplayInfor


// class DisplayInfor extends React.Component {
//     render(){
//         console.log('>>> call me render')

//         //Destructuring Array/object
//         const {listUsers} = this.props

//         return(
//             <div className = 'display-infor-container'>             
//                 {true &&
//                     <>
//                         {listUsers.map((user, index) => {

//                             return(
//                                 <div key = {user.id} className = {+user.age > 25 ? "green": "red"}>
//                                     <div>
//                                         <div>My name is {user.name}</div>
//                                         <div>My age is {user.age}</div>
//                                     </div>
//                                     <div>
//                                         <button onClick = {() => this.props.handleDeleteUser(user.id)}> Delete </button>
//                                     </div>
//                                     <hr/>
//                                 </div>
//                             )
//                         })}
//                     </>
//                 }
//             </div>               
//         )
//     }
// }
// export default DisplayInfor



