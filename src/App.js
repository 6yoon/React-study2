import {Button, Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './data.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './pages/Detail.js';

function App() {

  let [cat] = useState(data);

  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar data-bs-theme="dark" className='store-nav'>
        <Container>
          <Navbar.Brand href="/" className='nav-title'>세구상점</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Cart</Nav.Link>
            <Nav.Link href="/mypage">Mypage</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        {/* 메인페이지 */}
        <Route path='/' element={<>
          <div className='main-bg' style={{backgroundImage : 'url(./img/gosegu.jpg)'}}></div>
          <div className="container">
            <div className="row">
            {
              cat.map(function(a, i){
                return <>
                <Product cat = {cat[i]} i = {i} navigate = {navigate}></Product>
                </>
              })
            }
            </div>
          </div>
        </>} />

        {
          cat.map(function(a, i){
            return <Route path={'/detail/' + i} element={<Detail cat = {cat[i]} i = {i}></Detail>} />
          })
        }    

        {/* nested routes */}
        <Route path='/mypage' element={<About></About>} >
          <Route path='name' element={<div>육나윤</div>}></Route>
          <Route path='point' element={<div>1000p</div>}></Route>
        </Route>
          
        
        <Route path='*' element={<div style={{
          display: "flex", alignItems: "center", justifyContent: "center", height: "90vh"
          }}>
          <h1 style={{fontWeight : "bold"}}>
            이 페이지는 없는 페이지입니다.</h1>
          </div>} />
        
      </Routes>
      
    </div>
  );
}

function Product(props){
  return(
    <div className="col-md-4" onClick={ () => { props.navigate('/detail/' + props.i) }}>
      <img src={process.env.PUBLIC_URL + "/img/ㄱㅇㅇ" + (props.i + 1) +".jpg"} width="80%"/>
      <h4>{props.cat.title}</h4>
      <p>{props.cat.cute}</p>
    </div>
  );
}

function About(){
  return(
    <div>
      <h1>
        My Page
      </h1>
      <Outlet></Outlet>
    </div>
  )
}

export default App;
