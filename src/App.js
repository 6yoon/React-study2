import {Button, Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './data.js';
import {Routes, Route, Link} from 'react-router-dom';
import Detail from './detail.js'

function App() {

  let [cat] = useState(data);

  return (
    <div className="App">

      <Navbar data-bs-theme="dark" className='store-nav'>
        <Container>
          <Navbar.Brand href="home" className='nav-title'>세구상점</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Cart</Nav.Link>
            <Nav.Link href="#pricing">Mypage</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        {/* 메인페이지 */}
        <Route path='/' element={<>
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
        </>} />
        <Route path='/detail' element={<Detail></Detail>} />
      </Routes>
      
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
