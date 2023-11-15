import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Cart, Person } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';

const NavBarPrincipal: React.FC = () => {
  const navigate = useNavigate();

  const handleCarritoClick = () => {
    navigate('/Carrito'); // Redirige a la página del carrito
  };

  return (
    <Navbar expand="lg" bg="light">
      <Container>
        <Navbar.Brand href="#">
          <img src="src/assets/images/Logo.svg" alt="Logo el buen sabor" id="LogoNavPrincipal" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate('/HomePage')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/Producto')}>Menu</Nav.Link>
          </Nav>    
        </Navbar.Collapse>
        <Nav className="ml-auto justify-content-center mt-3 mb-0 gap-3">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdownMenu2" className="btnCuenta">
              Mi Cuenta
              <Person />
            </Dropdown.Toggle>
            <Dropdown.Menu aria-labelledby="dropdownMenu2">
              <Dropdown.Item onClick={() => navigate('/login')}>Iniciar Sesión</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/signUp')}>Registrarse</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="light" className="btn-Carrito" onClick={handleCarritoClick}>
            <Cart />
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBarPrincipal;
