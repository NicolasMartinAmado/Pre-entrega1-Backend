import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const TopNavbar = () => {
  return (

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#dashboard">Ecommerce</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#dashboard">Home</Nav.Link>
            <Nav.Link href="#products">Products</Nav.Link>
            <Nav.Link href="#realtimeproduct">Real Time Product</Nav.Link>
          </Nav>
          <div className="d-flex justify-content-end">
            <Button variant="outline-success">Login</Button>
          </div>
        </Container>
      </Navbar>

  )
}

export default TopNavbar