import ProjectList from "./components/ProjectList";
import TicketList from "./components/TicketList";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/project" element={<TicketList />} />
        {/* <Route path="/greeting/:type" render={(props) => <TicketList text="Hello, " {...props} />} /> */}
      </Routes>
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
