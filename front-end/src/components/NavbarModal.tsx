import { Navbar } from "react-bootstrap"
import {User} from "@model/user"


interface NavBarProps {
  loggedInUser: User | null,
  onSignUpClicked: () => void,
  onLoginClicked: () => void,
  onLogoutSuccessful: () => void,
}

const NavbarModal = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
  
  return (
   
  )
}

export default NavbarModal