import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
        </div> */}

      </div>
    </Router>
  );
}

export default App;

// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>Hi Welcome to My Project</h1>

//     </div>
//   );
// }

// export default App;
