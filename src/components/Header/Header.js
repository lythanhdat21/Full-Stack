import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"; // Để lấy State của Redux
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation} from "react-i18next";
import Profile from './Profile';
import { useState } from 'react';

const Header = () => {
    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {t} = useTranslation()
    const [isshowModalProfile, setIsShowModalProfile] = useState(false)

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogout = async() => {
        let rs = await logout(account.email, account.refresh_token)
        if (rs && rs.EC === 0){
            // Clear data redux
            dispatch(doLogout())

            navigate('/login')
        } else {
            toast.error (rs.EM)
        }
        // console.log("check res: ", rs) 
    }

    return (
    <>
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink to="/" className='navbar-brand'>Hỏi Dân IT</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>
                            {/* Home */}
                            {t('header.home')}
                        </NavLink>
                        <NavLink to="/users" className='nav-link'>
                            {/* Users */}
                            {t('header.user')}
                        </NavLink>
                        <NavLink to="/admins" className='nav-link'>
                            {/* Admin */}
                            {t('header.admin')}
                        </NavLink>                   
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ? // Trường hợp chưa đăng nhập:
                            <>
                                <button className = 'btn-login' onClick = {() => handleLogin()}>Log in</button>
                                <div className='aaa'>
                                    <button className = 'btn-signup' onClick = {() => handleRegister()}>
                                        <span className='bbb'>Sign up</span>
                                    </button>
                                </div>
                            </>
                            : // Trường hợp đã đăng nhập thành công
                            <NavDropdown title = {t('header.setting')} id = "basic-nav-dropdown">
                                <NavDropdown.Item onClick = {() => setIsShowModalProfile(true)}>
                                    {t('header.profile')}
                                </NavDropdown.Item >
                                <NavDropdown.Item onClick = {() => handleLogout()}>
                                    {t('header.logout')}
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Language/>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Profile
            show = {isshowModalProfile}
            setShow = {setIsShowModalProfile}
        />
    </>
    );
}

export default Header;



