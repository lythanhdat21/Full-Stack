import './Login.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';


const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

    const handleLogin = async() => {
        // validate
        const isValidEmail = validateEmail(email)
        if(!isValidEmail) {
            toast.error('Invalid email')
            // toast.success('test success')
            // toast.info('test information')
            return
        }

        if(!password) {
            toast.error('Invalid password')
            return
        }

        //submit Apis
        let data = await postLogin (email, password)

        if(data && data.EC === 0) {
            // dispatch ({
            //     type: 'FETCH_USER_LOGIN_SUCCESS',
            //     payload: data
            // })

            dispatch (doLogin(data))
            toast.success(data.EM)
            navigate('/')
        }

        if(data && data.EC !== 0) { // Delete res
            toast.error(data.EM) // Delete res
        }
    }

    return(
        <div className='login-container'>           
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={() => navigate('/register')}>Sign Up</button>
            </div>
            <div className='title col-4 mx-auto'>
                HoidanIT &amp; Tony {/*html entities */}
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who’s this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input 
                        type = {'email'} 
                        className = "form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>  
                <div className='form-group'>
                    <label>Password</label>
                    <input 
                        type = {'password'} 
                        className = "form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button 
                        className='btn-submit'
                        onClick={() => handleLogin()}
                    >Login to HoidanIT</button>
                </div>
                <div className='text-center'> {/*hoặc className='title mx-auto' */}
                    <span className = "back" onClick ={() => {navigate('/')}}>
                        &#60; &#60; Go to Homepage
                    </span>
                </div>         
            </div>
        </div>
    )
}
export default Login

