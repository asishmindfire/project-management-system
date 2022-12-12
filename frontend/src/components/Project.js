import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AddTicketModal from "./AddTicketModal";
import UpdateProjectModal from "./UpdateProjectModal";

export default function Project() {
  const location = useLocation();
  // console.log({ location });
  const incomingData = JSON.parse(location.state?.name);

  const [projectDetail, setprojectDetail] = useState(incomingData);

  const handleOnChange = (value) => {
    console.log(`projects data from child component ->`, value);
    setprojectDetail(value);
  };

  console.log(`incomingDataincomingData => `, projectDetail);

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <Link
          className="btn btn-secondary my-2"
          role="button"
          to="/ticketlist"
          state={{ data: projectDetail.projectId }}
        >
          Tickets
        </Link>
        <AddTicketModal data={projectDetail.projectId} />
        {/* <Link
          className="btn btn-secondary my-2 mx-3"
          role="button"
          to="/ticketlist"
          state={{ data: incomingData.projectId }}
        >
          All Tickets
        </Link> */}
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">Project</h1>
        </div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>Id</td>
              <td>{projectDetail.projectId}</td>
            </tr>
            <tr>
              <td>Project</td>
              <td>{projectDetail.projectname}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{projectDetail.projectdescription}</td>
            </tr>
          </tbody>
        </table>
        <UpdateProjectModal
          onChange={(value) => {
            console.log({ value });
            handleOnChange(value);
          }}
          projectDetails={projectDetail}
        />
      </div>
    </div>
  );
}
