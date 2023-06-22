import React , { useState , useEffect } from 'react';
import { FaTimes, FaBars } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';
import { Button } from '../NavbarFirstpage/globalStyles';
import { Nav ,  NavbarContainer , NavIcon , NavLogo , 
  MobileIcon , NavMenu , NavItem ,NavLinks ,NavItemBtn ,
   NavBtnLink} from '../NavbarFirstpage/Navbar.elements'


 


const Navbar = () => {

  const [click , setClick] = useState(false)
  const[button,setButton] = useState(true);

  const handleClick = () => setClick(!click)

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  }

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize' , showButton);


  return (
    <>
      <IconContext.Provider value={{color: '#fff'}}>
        <Nav> 
            <NavbarContainer> 
              <NavLogo>
                <NavIcon />
                  CARCARE
              </NavLogo>
              <MobileIcon onClick={handleClick}>
                {click ? <FaTimes /> : <FaBars />}
              </MobileIcon>

              <NavMenu onClick={handleClick} click={click}>
                <NavItem>
                  <NavLinks to='/'>Home</NavLinks>
                </NavItem>
              
                <NavItem>
                  <NavLinks to='/about'>About</NavLinks>
                </NavItem>
                            
                <NavItem>
                  <NavLinks to='/services'>Services</NavLinks>
                </NavItem>
                <NavItemBtn>
                  { button ? (
                    <NavBtnLink to ="/login">
                      <Button primary>LOGIN</Button>
                    </NavBtnLink>
                  ) :(
                    <NavBtnLink to = "/login">
                      <Button fontBig primary>
                        LOGIN
                      </Button>
                    </NavBtnLink>
                  )}
                </NavItemBtn>
              </NavMenu>

            </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar