import {Button, Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './data.js'

function App() {

  let [cat] = useState(data);

  return (
    <div className="App">
      <Navbar data-bs-theme="dark" className='store-nav'>
        <Container>
          <Navbar.Brand href="#home" className='nav-title'>세구상점</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
            <Nav.Link href="#pricing">Mypage</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className='main-bg' style={{backgroundImage : 'url(./img/gosegu.jpg)'}}></div>
      <Container className='product-box'>
        <Row>
          {
            cat.map(function(a, i){
              return <Product cat = {cat[i]} i = {i}></Product>
            })
          }
        </Row>
      </Container>
    </div>
  );
}

function Product(props){
  return(
    <Col>
      <img src={process.env.PUBLIC_URL + "/img/ㄱㅇㅇ" + (props.i + 1) +".jpg"} width="80%"/>
      <h4>{props.cat.title}</h4>
      <p>{props.cat.cute}</p>
    </Col>
  );
}

export default App;
