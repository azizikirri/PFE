import { Navbar, Nav, Container,NavDropdown,Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice'
import './Header.css'
const Header = () => {
  const {userInfo} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApi] = useLogoutMutation()
  const handleLogout=async()=>{
    try {
      await logoutApi().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header>
      <Navbar className='header' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand className='logo'><b style={{'color':'purple'}}>Q</b>uiziT</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              { userInfo ? (
                <>
                  <NavDropdown title={userInfo.prenom} id='username'  style={{'padding':'3px','borderRadius':'3px','textTransform':'uppercase','color':'black'}} >
                    <LinkContainer to='/profile' >
                      <NavDropdown.Item>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout} >
                      <FaSignOutAlt style={{'color':'#0f0014'}}/> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ):(
              <>
                  <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaSignInAlt style={{'color':'purple'}}/> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <Nav.Link>
                    <FaSignInAlt style={{'color':'purple'}}/> Sign Up
                  </Nav.Link>
                </LinkContainer>
              </>)}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;