import React, { useState } from "react";
import service from "../services/ProjectService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [logindata, seLogindata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(logindata);
    service
      .userLogin(logindata)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 1) {
          localStorage.setItem("usertoken", res.data.data);
          localStorage.setItem("userrole", res.data.role);
          navigate(`/profile`);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        // console.log(`Error from login api ->`, err);
        console.log(err.response.data.message);
        console.log(err.response.request.status);
        return alert(err.response.data.message);
      });
  };

  const handleOnChange = (e) => {
    seLogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={handleOnSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={logindata.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={logindata.password}
                onChange={handleOnChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block my-2"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  //   }
}

// export default Login
