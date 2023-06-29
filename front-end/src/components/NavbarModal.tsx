import { Container, Nav, Navbar } from "react-bootstrap"
import {User} from "@model/user"
import {css}  from "@emotion/css"
import  NavBarLoggedInView from "@comp/NavBarLoggedInView"
import NavBarLoggedOutView from "@comp/NavBarLoggedOutView"
import { Link } from "react-router-dom";

interface NavBarProps {
  loggedInUser: User | null,
  onSignUpClicked: () => void,
  onLoginClicked: () => void,
  onLogoutSuccessful: () => void,
}

const NavbarModal = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
  
  return (
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className={sNavbar}>
          <Container>
            <Navbar.Brand>
              Cool Notes App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />

                            : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
          </Container>
      </Navbar>
  )
}

export default NavbarModal

const sNavbar=css`
   background: linear-gradient(to top right, rgba(210, 221, 243, 0.8) 20%, rgba(252, 206, 200, 0.5) 120%);
   padding-bottom: 2rem;
   padding-top: 2rem;
   margin-bottom: 10px;
   border-radius: 10px;
`