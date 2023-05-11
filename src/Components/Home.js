import React, { useEffect, useState,useParams } from "react";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { Button, Modal,Carousel,Card } from "react-bootstrap";
import "./style.css";
import "./Home.css"
import Login from "./Login";
import { useLocation, useNavigate } from "react-router-dom";

const Home = ({ isLoggedIn, setisLoggedIn }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState("");

  const [isMobile, setIsMobile] = useState(false)
  const [isSingleDevice,setIsSingleDevice]=useState(false)
 
//choose the screen size 
const handleResize = () => {

  if (window.innerWidth < 576){
    setIsSingleDevice(true)
  }
  else{
    setIsSingleDevice(false)
  }
  if (window.innerWidth < 767 && window.innerWidth >= 576) {
      setIsMobile(true)
  } else {
      setIsMobile(false)
  }
}

// create an event listener
useEffect(() => {
  window.addEventListener("resize", handleResize)
})

  const { state } = useLocation();

  const reduceReviews = (acc, cur, index) => {
    if(isSingleDevice){
      const groupIndex = Math.floor(index / 1);
      if (!acc[groupIndex]) acc[groupIndex] = [];
      acc[groupIndex].push(cur);
      console.log(acc);
      return acc;
    }
    if(isMobile){
      const groupIndex = Math.floor(index / 2);
      if (!acc[groupIndex]) acc[groupIndex] = [];
      acc[groupIndex].push(cur);
      console.log(acc);
      return acc;
    }
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    console.log(acc);
    return acc;
  };

  const reviews = [
    {
      id: 1,
      image: "https://fakeimg.pl/300/",
      content: "fake review",
      author: "john doe"
  
    },
    {
      id: 2,
      image: "https://fakeimg.pl/300/",
      content: "fake review",
      author: "jane doe"
    },
    {
      id: 3,
      image: "https://fakeimg.pl/300/",
      content: "fake review",
      author: "dane doe"
    },
    {
      id: 4,
      image: "https://fakeimg.pl/300/",
      content: "fake review",
      author: "sankar doe"
  
    },
    {
      id: 5,
      image: "https://fakeimg.pl/300/",
      content: "fake review",
      author: "johnny doe"
  
    },{
      id: 6,
      image: "https://fakeimg.pl/300/",
      content: "fake review",
      author: "johnson doe"
  
    },
  ]
  

  
  useEffect(() => {
  
    const token = localStorage.getItem("token");
    if (isLoggedIn || token) {
      navigate("/therapy-notes");
    }
   
    else if(state?.path){
      console.log(state?.path,"fdfsfdsdsffds")
      handleShow("login")
    }
    
  }, []);
  const handleClose = () => {
    setShow(false);
    setLogin("");
  };
  const handleShow = (status) => {
    setShow(true);
    setLogin(status);
  };
  return (
    <div className="main-content">
      <div className="top-banner">
        <div className="container-fluid">
          <div className="top-banner">
            <div className="top-banner-left-cnt">
              <div className="top-banner-left-cnt-img">
                <img src="/images/header-banner.svg" alt="loading" />
              </div>
            </div>

            <div className="top-banner-right-cnt">
              <p className="banner-grey-text">Please Login and</p>

              <h3 className="blue-heading">
                Start Making Notes Regarding your therapy
              </h3>
              <p className="banner-para">
                Notes For Therapy was created to help maximize your therapy
                experience. Have you ever felt rushed going into a therapy session
                and realized you didn’t know what you wanted to talk about?
              </p>
              <div className="btn-head">
                <Button
                  className="button login-btn"
                  onClick={() => handleShow("login")}
                  variant="primary"
                  size="lg"
                >
                <img src="/images/loginIcon.svg" />
                  Login
                </Button>
                <Modal
                  className="login-modal"
                  show={show}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      style={{ border: "none", background: "transparent" }}
                      onClick={handleClose}
                    >
                      <img className="img-fluid" src="/images/cross.png" />
                    </button>
                  </div>

                  <Login
                    login={login}
                    setLogin={setLogin}
                    isLoggedIn={isLoggedIn}
                    setisLoggedIn={setisLoggedIn}
                  />
                </Modal>
                <Button
                  className="button signup-btn"
                  onClick={() => handleShow("signup")}
                  variant="primary"
                  size="lg"
                >
                <img src="/images/signupicon.svg" /> Signup
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

  

    
   
     
    </div>
  );
};

export default Home;
