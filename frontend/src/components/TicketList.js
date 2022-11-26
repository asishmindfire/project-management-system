import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function TicketList(props) {
  const location = useLocation();
  const data = location.state?.data;
  const data1 = location.state?.projectId;

  console.log(`props data ->`, data);
  console.log(`f------> `, data1);

  return (
    <div className="container my-5">
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
                    // value={projectdetails.projectId}
                    // onChange={projectdetailsOnChange}
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
                    // value={projectdetails.projectname}
                    // onChange={projectdetailsOnChange}
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
                    // value={projectdetails.projectdescription}
                    // onChange={projectdetailsOnChange}
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
                // onClick={InsertProject}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-center">List of Tickets</h1>
      <button>Filter</button>
      <table className="table table-bordered table-striped my-4">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Ticket</th>
            {/* <th scope="col">Description</th> */}
            {/* <th scope="col">Tags</th>
            <th scope="col">AssignTo</th>
            <th scope="col">Acceptance</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((el) => {
            return (
              <tr>
                <td> {el.ticketId} </td>
                <td> {el.ticketname} </td>
                {/* <td> {el.ticketdescription} </td>
                <td> {el.tags.map((ele) => <button class="btn btn-primary my-1 mx-1">{ele}</button>)} </td>
                <td> {el.assignTo} </td>
                <td> {el.acceptance} </td> */}
                <td>
                  <Link
                    className="btn btn-primary my-2 mx-3"
                    role="button"
                    to="/ticket"
                    // state={{ data: incomingData.tickets }}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
