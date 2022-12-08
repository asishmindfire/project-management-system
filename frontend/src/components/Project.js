import React from "react";
import { Link, useLocation } from "react-router-dom";
import AddTicketModal from "./AddTicketModal";

export default function Project() {
  const location = useLocation();
  console.log({location});
  const incomingData = JSON.parse(location.state?.name);

  console.log(`incomingDataincomingData => `, incomingData);

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <Link
          className="btn btn-secondary my-2"
          role="button"
          to="/ticketlist"
          state={{ data: incomingData.projectId }}
        >
          All Tickets
        </Link>
        <AddTicketModal data={incomingData.projectId} />
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
              <td>{incomingData.projectId}</td>
            </tr>
            <tr>
              <td>Project</td>
              <td>{incomingData.projectname}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{incomingData.projectdescription}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </div>
    </div>
  );
}
