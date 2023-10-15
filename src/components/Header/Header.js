import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"; // Để lấy State của Redux

const Header = () => {
    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    return (
    <Navbar bg="light" expand="lg">
        <Container>
            <NavLink to="/" className='navbar-brand'>Hỏi Dân IT</NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink to="/" className='nav-link'>Home</NavLink>
                    <NavLink to="/users" className='nav-link'>Users</NavLink>
                    <NavLink to="/admins" className='nav-link'>Admin</NavLink>                   
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
                        <NavDropdown title = "Settings" id = "basic-nav-dropdown">
                            <NavDropdown.Item>Log out</NavDropdown.Item>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </NavDropdown>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default Header;



