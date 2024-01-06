import {Button, Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './data.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './pages/Detail.js';
import axios from 'axios';
import Cart from './pages/Cart.js'

function App() {

  let [cat, setCat] = useState(data);

  let navigate = useNavigate();

  let [count, setCount] = useState(1);

  let [load, setLoad] = useState(false);

  let [button, setButton] = useState(true);

  return (
    <div className="App">

      <Navbar data-bs-theme="dark" className='store-nav'>
        <Container>
          <Navbar.Brand href="/" className='nav-title'>세구상점</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
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
            <div>
              {
                load == true ? <div>상품을 로드 중입니다</div> : null
              }
              {
                button == true ?
                <button onClick={()=>{
                  setCount(++count);
                  setLoad(true);
                  console.log(count)
                  if(count == 3){
                    setButton(false)
                  }
                  axios.get('https://codingapple1.github.io/shop/data'+ count +'.json')
                  .then((data)=>{
                    let copy = [...cat, ...data.data]
                    setCat(copy)
                    setLoad(false);
                  })
                  .catch(()=>{
                    setLoad(false);
                  })
                }}>더보기</button> : null
              }

              <button style={{margin : "5px"}}
                onClick={ () => {
                let copy = [...cat];
                copy.sort((a, b) => a.title.localeCompare(b.title));
                setCat(copy);
              }}>가나다 정렬</button>
            </div>
            </div>
          </div>
        </>} />

        <Route path={'/detail/:id'} element={<Detail cat = {cat} navigate = {navigate}></Detail>} />

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
        
        <Route path='/cart' element={<Cart></Cart>}/>
        
      </Routes>
      
    </div>
  );
}

function Product(props){
  return(
    <div className="col-md-4" onClick={ () => { props.navigate('/detail/' + (props.cat.id)) }}>
      <img src={process.env.PUBLIC_URL + "https://codingapple1.github.io/shop/shoes" + (props.cat.id + 1) +".jpg"} width="80%"/>
      <h4>{props.cat.title}</h4>
      <p>{props.cat.price}</p>
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
