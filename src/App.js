import { Button, Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data.js";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  json,
} from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
//import Detail from './pages/Detail.js'
//import Cart from './pages/Cart.js'

const Detail = lazy(() => import("./pages/Detail.js"));
const Cart = lazy(() => import("./pages/Cart.js"));

function App() {
  let [cat, setCat] = useState(data);

  let navigate = useNavigate();

  let [count, setCount] = useState(1);

  let [load, setLoad] = useState(false);

  let [button, setButton] = useState(true);

  let [watched, setWatched] = useState([]);

  let [stop, setStop] = useState(true);


  useEffect(() => {});

  useEffect(() => {
    if (watched.length < 0)
      localStorage.setItem("watched", JSON.stringify(watched));
    setWatched(JSON.parse(localStorage.getItem("watched")));
  }, []);

  let result = useQuery({
    queryKey: ["a"],
    queryFn: () => {
      return axios
        .get("https://codingapple1.github.io/userdata.json")
        .then((a) => {
          return a.data;
        });
    },
  });

  return (
    <div className="App">
      {stop == true ? (
        <div className="watched">
          <h5 style={{ fontWeight: "bold" }}>최근 본 상품</h5>
          <span
            className="x"
            onClick={(e) => {
              e.stopPropagation();
              setStop(false);
            }}
          >
            x
          </span>
          <hr></hr>
          {watched.map(function (a, i) {
            return (
              <>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "https://codingapple1.github.io/shop/shoes" +
                    (a + 1) +
                    ".jpg"
                  }
                  width="80%"
                ></img>
                {/* <p style={{fontWeight : "bold"}}>{cat.find((item)=>item.id == a).title}</p> */}
              </>
            );
          })}
        </div>
      ) : (
        <div className="watched">
          <h5 style={{ fontWeight: "bold" }}>최근 본 상품</h5>
          <span
            onClick={(e) => {
              e.stopPropagation();
              setStop(true);
            }}
            style={{ cursor: "pointer" }}
          >
            ▽
          </span>
        </div>
      )}

      <Navbar data-bs-theme="dark" className="store-nav">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
            className="nav-title"
          >
            세구상점
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
            <Nav.Link href="/mypage">Mypage</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            반가워요 {result.isLoading ? "로딩 중" : result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          {/* 메인페이지 */}
          <Route
            path="/"
            element={
              <>
                <div
                  className="main-bg"
                  style={{ backgroundImage: "url(./img/gosegu.jpg)" }}
                ></div>
                <div className="container">
                  <div className="row">
                    {cat.map(function (a, i) {
                      return (
                        <>
                          <Product
                            cat={cat[i]}
                            i={i}
                            navigate={navigate}
                            watched={watched}
                            setWatched={setWatched}
                          ></Product>
                        </>
                      );
                    })}
                    <div>
                      {load == true ? <div>상품을 로드 중입니다</div> : null}
                      {button == true ? (
                        <button
                          onClick={() => {
                            setCount(++count);
                            setLoad(true);
                            if (count == 3) {
                              setButton(false);
                            }
                            axios
                              .get(
                                "https://codingapple1.github.io/shop/data" +
                                  count +
                                  ".json"
                              )
                              .then((data) => {
                                let copy = [...cat, ...data.data];
                                setCat(copy);
                                setLoad(false);
                              })
                              .catch(() => {
                                setLoad(false);
                              });
                          }}
                        >
                          더보기
                        </button>
                      ) : null}

                      <button
                        style={{ margin: "5px" }}
                        onClick={() => {
                          let copy = [...cat];
                          copy.sort((a, b) => a.title.localeCompare(b.title));
                          setCat(copy);
                        }}
                      >
                        가나다 정렬
                    </div>
                  </div>
                </div>
              </>
            }
          />

          <Route
            path={"/detail/:id"}
            element={
              <Detail
                cat={cat}
                navigate={navigate}
                setCat={setCat}
                setLoad={setLoad}
              ></Detail>
            }
          />

          {/* nested routes */}
          <Route path="/mypage" element={<About></About>}>
            <Route path="name" element={<div>육나윤</div>}></Route>
            <Route path="point" element={<div>1000p</div>}></Route>
          </Route>

          <Route
            path="*"
            element={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "90vh",
                }}
              >
                <h1 style={{ fontWeight: "bold" }}>
                  이 페이지는 없는 페이지입니다.
                </h1>
              </div>
            }
          />

          <Route path="/cart" element={<Cart></Cart>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function Product(props) {
  return (
    <div
      className="col-md-4"
      onClick={() => {
        props.navigate("/detail/" + props.cat.id);
        if (props.watched.indexOf(props.cat.id) > -1)
          props.watched.splice(props.watched.indexOf(props.cat.id), 1);
        props.watched.unshift(props.cat.id);
        if (props.watched.length > 3) props.watched.pop();
        localStorage.setItem("watched", JSON.stringify(props.watched));
      }}
    >
      <img
        src={
          process.env.PUBLIC_URL +
          "https://codingapple1.github.io/shop/shoes" +
          (props.cat.id + 1) +
          ".jpg"
        }
        width="80%"
      />
      <h4>{props.cat.title}</h4>
      <p>{props.cat.price}</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>My Page</h1>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
