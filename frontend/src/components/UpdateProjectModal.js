import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import service from "../services/ProjectService";

export default function UpdateProjectModal(props) {
  const location = useLocation();
  console.log(`---oo`, { location });
  const [modal, setModal] = useState(true);
  const [updateProject, setUpdateProject] = useState(
    JSON.parse(location.state.name)
  );
  const [updateRequestData, setUpdateRequestData] = useState({});

  useEffect(() => {
    console.log("updateProject", updateProject);
    if (localStorage.getItem("userrole") === "Developer_Role") {
      setModal(false);
    }
  }, []);

  const projectdetailsOnChange = (e) => {
    setUpdateProject({ ...updateProject, [e.target.name]: e.target.value });
    setUpdateRequestData({ ...updateRequestData, [e.target.name]: e.target.value })
  };

  const handleOnSubmit = () => {
    service
      .updateProjectDeatils({
        projectId: updateProject.projectId,
        update_data: updateRequestData
    })
      .then((updated_project) => {
        console.log(`alluser data ->`, updated_project.data);

        if (updated_project.data.status === 1) {
            props.onChange(updateProject);
        } else {
          alert(updated_project.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {modal ? (
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#updateProjectModal"
        >
          Update
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#showErrorModal"
        >
          Update
        </button>
      )}

      {/* Center Modal */}

      <div
        className="modal fade"
        id="showErrorModal"
        tabIndex="-1"
        aria-labelledby="showErrorModalLabel"
        aria-hidden="true"
      >
        {/* -centered col-md-5 mx-auto */}
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              You are not Authorized to Access this Resource.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="updateProjectModal"
        tabIndex="-1"
        aria-labelledby="updateProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateProjectModalLabel">
                Update Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Project Name:
                </label>
                <input
                  type="text"
                  name="projectname"
                  className="form-control"
                  id="recipient-name"
                  placeholder="Enter ticket name"
                  value={updateProject.projectname}
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
                  id="message-text1"
                  placeholder="Enter ticket description"
                  value={updateProject.projectdescription}
                  onChange={projectdetailsOnChange}
                ></textarea>
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
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                  onClick={handleOnSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
