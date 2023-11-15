import { Container,  Dropdown,  Nav, Navbar } from "react-bootstrap";
import { BoxArrowRight, Person } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';

const NavBarChef: React.FC = () => {
  const navigate = useNavigate();


  return (
    <Navbar expand="lg" bg="light">
      <Container>
        <Navbar.Brand href="#">
          <img src="src/assets/images/Logo.svg" alt="Logo el buen sabor" id="LogoNavPrincipal" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate('/Pedidos')}>Mis Pedidos</Nav.Link>
            <Nav.Link onClick={() => navigate('/stock')}>Stock</Nav.Link>
            <Nav.Link onClick={() => navigate('/RubroInsumo')}>Rubro</Nav.Link>
            
          </Nav>    
        </Navbar.Collapse>
        <Nav className="ml-auto justify-content-center mt-3 mb-0 gap-3">
        <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdownMenu2" className="btnCuenta">
              Chef Rocco
              <Person />
            </Dropdown.Toggle>
            <Dropdown.Menu aria-labelledby="dropdownMenu2">
              <Dropdown.Item onClick={() => navigate('/')}>Mis datos Personales</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/')}>Salir <BoxArrowRight /> </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBarChef;
