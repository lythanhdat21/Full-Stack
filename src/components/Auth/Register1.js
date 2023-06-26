import './Register.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { postRegister } from '../../services/apiService'


const Register = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const navigate = useNavigate()

    const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleRegister = async() => {
        // validate
        const isValidEmail = validateEmail(email)
        if(!isValidEmail) {
            toast.error('Invalid email')
            return
        }
        
        //submit Apis
        let data = await postRegister (email, password, username)

        if(data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/login')
        }

        if(data && data.EC !== 0) {
            toast.error(data.EM) 
        }
    }

    return(
        <section>
            <div className='register-box'> 
                <form action ="">
                    <h2>Hoi Dan IT</h2>
                    <div className='input-box'>
                        <input 
                            type = {'email'} 
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <label>Email (*)</label>
                    </div>  
                    <div className='input-box'> 
                        <input 
                            type = {isShowPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {
                            isShowPassword ?
                                <span className='icons-eye'
                                    onClick={() => setIsShowPassword(false)}>
                                    <AiFillEyeInvisible/>
                                </span>
                                :
                                <span className='icons-eye'
                                    onClick={() => setIsShowPassword(true)}>
                                    <AiFillEye/>
                                </span>
                        }
                        <label>Password (*)</label>
                    </div>
                    <div className='input-box'>
                        <input 
                            type = {'username'}
                            required
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <label>User name</label>
                        <i></i>
                    </div>
                    <button 
                        href = "#"
                        onClick={() => handleRegister()}
                    >
                        Create my free account
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div className='text-center'> {/*hoặc className='title mx-auto' */}
                        <span className = "back" onClick ={() => {navigate('/')}}>
                            &#60; &#60; Go to Homepage
                        </span>
                    </div> 
                </form>   
            </div>
        </section>
    )
}
export default Register


