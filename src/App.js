import './App.css';
import NavbarComponent from './components/Navbar';
import Component1 from './components/Component1'
import Component2 from './components/Component2'
import {Container,Row,Col} from 'react-bootstrap'
import './bootstrap.min.css'
function App() {
  return (
    <>
      <NavbarComponent/>
      <Container>
        <Row>
          <Col md={6} lg={6} sm={6} xs={6}>
            <Component1/>
          </Col>
          <Col md={6} lg={6} sm={6} xs={6}>
          <Component2/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
