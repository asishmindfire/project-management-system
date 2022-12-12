import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProjectService from "../services/ProjectService";
import axios from "axios";

export default function Profile() {
  const [project, setProjeject] = useState([]);
  const [projectdetails, setProjectdetails] = useState({
    projectdescription: "",
    projectname: "",
    projectId: "",
  });
  const [userData, setuserData] = useState({});
  const navigate = useNavigate();
  const [buttonOnOff, setButtonOnOff] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("userrole") === "Developer_Role") {
      //   alert("you");
      console.log("ROLE");
      setButtonOnOff(false);
    }

    axios
      .get("http://localhost:8080/profile", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("usertoken"),
        },
      })
      .then((user_data) => {
        console.log(`user data ->`, user_data.data);

        if (user_data.data.status === 1) {
          // setuserData({ ...user_data.data.data, ...userData  });
          setuserData(user_data.data.data);

          // console.log(`===========->`, userData);
          axios
            .get("http://localhost:8080/fetchallprojects")
            .then((res) => {
              setProjeject(res.data.data);
              // console.log(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert(user_data.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const projectdetailsOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setProjectdetails({ ...projectdetails, [e.target.name]: e.target.value });
  };

  const onddlChange = (e) => {
    // setProjectdata(e.target.value);
    console.log("hulkj", e.target.value);
    // navigate(`/project`, { state: { name: JSON.stringify(e.target.value) }});
    navigate(`/project`, { state: { name: e.target.value } });
    // alert(e.target.value);
  };

  const InsertProject = () => {
    console.log(`===>`, projectdetails);
    // useEffect(() => {
    ProjectService.addProject(projectdetails)
      .then((response) => {
        // setProjects(response.data.data);
        console.log(`data coming ->`, response.data);
      })
      .catch((err) => {
        console.log(`=======>`, err);
      });
    // }, []);
  };

  return (
    <div className="container">
      {/* <div> */}
      <select
        className="form-control col-md-1"
        //   value={projectdata}
        onChange={onddlChange}
      >
        <option value="0"> --Select Project-- </option>
        {project.map((el) => {
          return (
            <option
              key={el.projectId}
              value={JSON.stringify(el)}
              // onClick={updateStateVal}
            >
              {el.projectname}
            </option>
          );
        })}
      </select>

      {buttonOnOff && (
        <button
          type="button"
          className="btn btn-outline-primary my-3 mx-3"
          data-bs-toggle="modal"
          data-bs-target="#projectModal"
        >
          Add Project
        </button>
      )}

      {/* Add Project Modal */}
      <div
        className="modal fade"
        id="projectModal"
        tabIndex="-1"
        aria-labelledby="projectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="projectModalLabel">
                Add Project
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Project Name:
                  </label>
                  <input
                    type="text"
                    name="projectname"
                    className="form-control"
                    id="recipient-name"
                    placeholder="Enter your first name"
                    value={projectdetails.projectname}
                    onChange={projectdetailsOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Project Description:
                  </label>
                  <textarea
                    className="form-control"
                    name="projectdescription"
                    id="message-text"
                    placeholder="Enter your first name"
                    value={projectdetails.projectdescription}
                    onChange={projectdetailsOnChange}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={InsertProject}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <Link
        className="btn btn-secondary my-2"
        role="button"
        to="/userticket"
        state={{ data: userData.user_id }}
      >
        Tickets
      </Link>

      {/* </div> */}
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">PROFILE</h1>
        </div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>Username</td>
              <td>{userData.user_name}</td>
            </tr>
            <tr>
              <td>User Role</td>
              <td>{userData.user_role}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{userData.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  //   }
}

// export default Profile
