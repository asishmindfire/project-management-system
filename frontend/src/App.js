import Project from "./components/Project";
import TicketList from "./components/TicketList";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Ticket from "./components/Ticket";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/project" element={<Project />} />
          <Route path="/ticketlist" element={<TicketList />} />
          <Route path="/ticket" element={<Ticket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Navbar from './components/Navbar'

// function App() {
// return (
// <Router>
//   <div className="App">
//     <Navbar />
//     <Route exact path="/" component={Landing} />
//     <div className="container">
//       <Route exact path="/register" component={Register} />
//       <Route exact path="/login" component={Login} />
//       <Route exact path="/profile" component={Profile} />
//     </div>

//   </div>
// </Router>
// );
// }

// export default App;

// import './App.css';
