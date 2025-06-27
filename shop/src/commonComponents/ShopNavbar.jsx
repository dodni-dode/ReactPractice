// src/components/ShopNavbar.jsx
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function ShopNavbar() {
  const navigate = useNavigate()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}>React-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/cart')}>Cart</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate('/action1')}>Action</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/action2')}>Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate('/action3')}>Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default ShopNavbar
