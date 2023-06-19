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

      <div className="download-banner-outer">
        <div className="container-fluid">
          <div className="download-banner">
            <div className="dounload-inner">
              <h2>Download Our app</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's.
              </p>
              <div className="download-btn-head">
                <button>
                  <img src="/images/playstore.png" />
                </button>
                <button>
                  <img src="/images/appstore.png" />
                </button>
              </div>
            </div>

            <div className="dounload-inner-right">
                  <img src="/images/app.png" />
            </div>

          </div>
        </div>  
      </div>

      <div className="story-section">
        <div className="container-fluid">
          <div className="story-section">
            <div className="story-head">
              <p className="banner-grey-text">Who we are</p>
              <h2 className="blue-heading">Our Story</h2>
              <h4>
                Notes For Therapy was created to help maximize your therapy
                experience. Have you ever felt rushed going into a therapy session
                and realized you didn’t know what you wanted to talk about?
              </h4>
            </div>
            <div className="story-inner">
              <div style={{ width: "50%" }}>
                <img src="/images/our-story.png" alt="loading" />
              </div>
              <div style={{ width: "50%", alignSelf: "center" }}>
                <ul className="list-head">
                  <li>
                    With this app, you can add notes about relevant topics
                    throughout the week (or longer, if your therapy appointments
                    aren’t weekly). With this tool, you can feel clear and prepared
                    going into your therapy sessions!
                  </li>
                  <li>
                    Once you click on the therapy option (Individual, Couples or
                    Other), you have the option to write journal entries, notes for
                    specific therapy sessions, information on your goals, and
                    entering your sessions on a calendar so that you can track.
                  </li>
                </ul>
              </div>
            </div>
          </div>  
        </div>
      </div>

      <div className="testinomials">
        <div className="container-fluid">
          <div className="testimonial_head">
          <h3>MY CLIENTS</h3>
          <h2>Testimonials</h2>
          <Carousel >
          {reviews.reduce(reduceReviews, []).map((review, index) => (

            <Carousel.Item key={index}>
            <div className="d-flex justify-content-center" style={{gap:"50px"}}>
              {review.map((item, index) => {
                return (
                  <Card key={index} style={{ width: "25rem" }}>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                     
                      
                <h6>{item.content} rggjsidpg  cxefka edgkdld gegdolgdol jpkk</h6>
                <h4>-{item.author}</h4>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

           
          </div>
        </div>  
      </div>

      <div className="subscriptions">
        <div className="container-fluid">
          <div className="subscriptions-cnt">
            <div className="news-left">
              <p>Mailing List</p>
              <h2>Subscribe to our Newsletter</h2>
            </div>
            <div className="news-right">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's.
              </p>
              <div className="news-input-head">
                <input
                  type="email"
                  placeholder="Enter your email address"
                ></input>
                <Button>
                  Subscribe
                  <img
                    style={{ width: "18px", marginLeft: "10px" }}
                    src="/images/mail.svg"
                  />
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
