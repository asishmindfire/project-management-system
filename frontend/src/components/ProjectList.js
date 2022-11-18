import React, { useEffect, useState } from "react";
import ProjectService from "../services/ProjectService";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import TicketList from '../components/TicketList';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [projectdetails, setProjectdetails] = useState({
    projectdescription: "",
    projectname: "",
    projectId: "",
  });

  useEffect(() => {
    ProjectService.getAllProjects()
      .then((response) => {
        setProjects(response.data.data);
        console.log(`data coming ->`, response.data.data);
      })
      .catch((err) => {
        console.log(`=======>`, err);
      });
  }, []);
  //   The above [] is use to define dependence of useEffect

  const projectdetailsOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setProjectdetails({ ...projectdetails, [e.target.name]: e.target.value });
  };

  // const HandleOnClick = () => {
  // console.log("handleOnClick clicked", projects);
  // useNavigate(`/project`);
  // projects.map((el) => console.log(`-=-=->`, el));
  // history.pushState(``);
  // console.log(`-=-=->`, projects[0].projectname);
  // };

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
    <div className="container my-5">
      <h1 className="text-center">List of Projects</h1>

      <button
        type="button"
        className="btn btn-outline-primary my-3 mx-3"
        data-bs-toggle="modal"
        data-bs-target="#projectModal"
      >
        +Add Project
      </button>

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
                    Project Id:
                  </label>
                  <input
                    type="text"
                    name="projectId"
                    className="form-control"
                    id="recipient-id"
                    placeholder="Enter your first name"
                    // value={projectdetails.project_id ? projectdetails.project_id : projectdetails}
                    value={projectdetails.projectId}
                    onChange={projectdetailsOnChange}
                  />
                </div>
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

      {/* This is project tabel */}
      <table className="table table-bordered table-striped">
        <thead>
          <td>Id</td>
          <td>Projects</td>
          <td>Description</td>
          <td>Tickets</td>
        </thead>
        <tbody>
          {projects.map((el) => {
            return (
              <tr key={el.projectId}>
                <td> {el.projectId} </td>
                <td> {el.projectname} </td>
                <td> {el.projectdescription} </td>
                {/* <button
                  className="btn btn-primary my-2 mx-3"
                  onClick={HandleOnClick}
                >
                  Tickets
                </button> */}
                <Link
                  className="btn btn-primary my-2 mx-3"
                  role="button"
                  to="/project"
                  state={{ data: el.tickets, projectId: el.projectId }}
                  // to={"/project/:76"}
                  // project_details={el}
                  // onClick={HandleOnClick}
                >
                  Button1
                </Link>
                {/* <td> {projects.acceptance} </td> */}
                {/* <td> {projects.tags} </td> */}
                {/* <td> {projects.employee} </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// export default withRouter(ProjectList);
