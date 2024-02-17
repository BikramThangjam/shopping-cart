import { Container, Nav, Navbar as NavbarBs, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import "../style.css";
import { useTheme, useThemeUpdate } from "../context/ThemeContext";


export function Navbar() {
    
    const cartIconStyle = {
        color:"white", 
        width:"1.3rem", 
        height:"1.3rem", 
        fontSize:"13px", 
        position:"absolute", 
        top:0, 
        right:0, 
        transform:"translate(25%, 0)"
    }

    const {openCart, cartQuantity} = useShoppingCart()
    const darkTheme = useTheme()
    const toggleTheme = useThemeUpdate()
    
    

    return (
        <NavbarBs className={`${darkTheme ? "bg-dark dark": "bg-white"} shadow-sm `}>
            <Container>
                <Nav className={`me-auto ${darkTheme && "dark"}`}>
                    <Nav.Link to="/" as={NavLink} className={`${darkTheme ? "text-light" : "text-dark"}`}>Home</Nav.Link>
                    <Nav.Link to="/store" as={NavLink} className={`${darkTheme ? "text-light" : "text-dark"}`}>Products</Nav.Link>
                    <Nav.Link to="/about" as={NavLink} className={`${darkTheme ? "text-light" : "text-dark"}`}>About</Nav.Link>
                </Nav>
                <div className="toggler">
                    <p className="toggler--light">Light</p>
                    <div className={`toggler--slider`} onClick={()=> toggleTheme()}>                       
                        <div className="toggler--slider--circle"></div>                     
                    </div>
                    <p className="toggler--dark">Dark</p>
                </div>
                {cartQuantity > 0 &&
                    <Button onClick={openCart} style={{width: "3rem", height:"3rem", position:"relative"}} variant={darkTheme ? "outline-light": "outline-dark"}className="rounded-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={cartIconStyle}>{cartQuantity}</div>
                    </Button>                  
                }
            </Container>
        </NavbarBs>
    )
}