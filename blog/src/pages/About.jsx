// src/pages/About.jsx
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

function About() {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={3}>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="member">Member</Nav.Link>
            <Nav.Link as={Link} to="location">Location</Nav.Link>
          </Nav>
        </Col>
        <Col md={9}>
          <h4>About Page</h4>
          <p>이곳은 About 페이지임</p>
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}

export default About
