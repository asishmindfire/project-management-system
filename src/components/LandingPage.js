import React from "react";
import "../../css/LandingPage.css";
import picture from "../../assets/Product-screenshot.png";
import circles from "../../assets/Methodize_lp-circles-bg.png";
import Logo from "../../assets/Logo";

const LandingPage = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        backgroundImage: `linear-gradient(to top right, #2D3947, #151B26)`,
        backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        display: "flex",
        height: "100%",
        zIndex: "-2",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          backgroundImage: `url(${circles})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: "-1",
        }}
      ></div>
      <div className="landing-container">
        <div className="landing-nav-container">
          <div className="landing-nav-logo" style={{ paddingTop: "7px" }}>
            <a href="/">
              <Logo />
            </a>
          </div>
          <div className="landing-nav-sessions">
            <div style={{ marginRight: "20px" }}>
              <a href="/login">
                <button className="landing-nav-login--button">Login</button>
              </a>
            </div>

            <div>
              <a href="/register">
                <button className="landing-nav-register--button">
                  Register
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="landing-main">
          <div className="landing-message">
            <h2
              style={{
                fontSize: "3em",
                fontWeight: "200",
                color: "white",
                width: "57%",
              }}
            >
              The easiest way to manage team, projects, and tasks
            </h2>
            <h3 style={{ fontWeight: "200", color: "white", width: "46%" }}>
              Why use Methodize? Methodize gives you everything you need to stay
              in sync, hit deadlines, and reach your goals
            </h3>
            <div className="landing-message-button--div">
              <a href="/login">
                <button className="landing-message--button">Try Demo</button>
              </a>
            </div>
          </div>
          <div className="landing-main-picture">
            <img src={picture} alt="landing" className="landing-picture" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
