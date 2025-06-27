// src/pages/NotFound.jsx
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <h4>잘못된 경로임</h4>
          <p>다시 확인 필요</p>
          <Link to="/">홈으로</Link>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
