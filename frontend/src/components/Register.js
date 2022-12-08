import React, { useState } from "react";
// import { register } from './UserFunctions'
import service from "../services/ProjectService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [registration, setRegistration] = useState({
    user_name: "",
    email: "",
    password: "",
    cpassword: "",
    user_role: "",
  });

  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const request_data = { ...registration, user_role: role };
    console.log(request_data);
    console.log(request_data.password.localeCompare(request_data.cpassword));
    if (request_data.password.localeCompare(request_data.cpassword) !== 0) {
      return alert("Password didn't match, Please try again!");
    }
    service
      .userRegistration(request_data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 1) {
          navigate(`/login`);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setRegistration({
      ...registration,
      [e.target.name]: e.target.value,
    });
    // console.log(registration);
  };

  const onRoleSelect = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form
            // noValidate
            action=""
            onSubmit={handleOnSubmit}
          >
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            <div className="form-group">
              <label htmlFor="name">User name</label>
              <input
                type="text"
                className="form-control"
                name="user_name"
                placeholder="Enter your user name"
                value={registration.user_name}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                // autoComplete="off"
                className="form-control"
                name="email"
                placeholder="Enter your email name"
                value={registration.email}
                onChange={handleOnChange}
              />
            </div>

            <div>
              <label htmlFor="name">Select Role</label>
              <select
                className="form-control col-md-1"
                value={role}
                onChange={onRoleSelect}
              >
                <option value="0"> --Select Project-- </option>
                <option value="Developer_Role">Developer_Role</option>
                <option value="Manager_Role">Manager_Role</option>
                <option value="Admin_Role">Admin_Role</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                value={registration.password}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="cpassword"
                placeholder="Confirm Password"
                value={registration.cpassword}
                onChange={handleOnChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block my-2"
            >
              Register!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  //   }
}

// export default Register
