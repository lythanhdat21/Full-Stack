import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoute = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated) // copy from Header.js

    console.log(">>> check isAuthenticated: ", isAuthenticated)

    if (!isAuthenticated){
        return <Navigate to = "/login"></Navigate>
    }

    return(
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute


