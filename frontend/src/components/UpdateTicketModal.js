import React, { useEffect, useState } from "react";
import TagsInput from "./TagsInput";
import { useLocation } from "react-router-dom";
import service from "../services/ProjectService";

export default function UpdateTicketModal(props) {
  const location = useLocation();
  const data = location.state.data;
  console.log(`update Ticket details modal ->`, data);

  const [ticket, setTicket] = useState(data);
  const [users, setUsers] = useState([]);

  const [updateticket, setUpdateTicket] = useState({});
  const [modal, setModal] = useState(true);

  useEffect(() => {
    console.log(
      `localStorage.getItem("userrole") ->`,
      localStorage.getItem("userrole")
    );
    if (localStorage.getItem("userrole") === "Developer_Role") {
      //   alert("you");
      console.log("ROLE");
      setModal(false);
    }
    service
      .getAllUsers()
      .then((alluser_data) => {
        console.log(`alluser data ->`, alluser_data.data);

        if (alluser_data.data.status === 1) {
          setUsers(alluser_data.data.data);
        } else {
          alert(alluser_data.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const ticketdetailsOnChange = (e) => {
    console.log(`ticketdetailsOnChange ->`, e.target.name, e.target.value);
    setTicket({ ...ticket, [e.target.name]: e.target.value });
    setUpdateTicket({
      ...updateticket,
      [e.target.name]: e.target.value,
    });
    // console.log(ticket);
  };

  const onUserSelection = (e) => {
    console.log(`onUserSelection`, e.target.value);
    setUpdateTicket({
      ...updateticket,
      assign_to: parseInt(e.target.value),
    });
  };

  const handleOnSubmit = (e) => {
    console.log(`handleOnSubmit ->`, updateticket);
    service
      .updateTicketDeatils({
        ticketId: ticket.ticketId,
        update_data: updateticket,
      })
      .then((alluser_data) => {
        console.log(`alluser data ->`, alluser_data.data);

        if (alluser_data.data.status === 1) {
          props.onChange(ticket);
          //   setUsers(alluser_data.data.data);
        } else {
          alert(alluser_data.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tagsDataFromChildComponent = (e) => {
    console.log(`tagsDataFromChildComponent ->`, e);
    setTicket({ ...ticket, tags: e });
    setUpdateTicket({
      ...updateticket,
      tags: e,
    });
  };

  const onStatusSelection = (e) => {
    console.log(`onStatusSelection`, e.target.value);
    setUpdateTicket({
      ...updateticket,
      status: e.target.value,
    });
    setTicket({ ...ticket, status: e.target.value });
  };

  return (
    <div>
      {modal ? (
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#addTicketModal"
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
              {/* <h1 className="modal-title fs-5" id="showErrorModalLabel">
                Modal title
              </h1> */}
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
        id="addTicketModal"
        tabIndex="-1"
        aria-labelledby="addTicketModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addTicketModalLabel">
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
              <select
                className="form-control col-md-1"
                onChange={onStatusSelection}
              >
                <option value="0"> --Ticket Status-- </option>
                <option value="BACKLOG"> BACKLOG </option>
                <option value="INPROGRESS"> INPROGRESS </option>
                <option value="DONE"> DONE </option>
              </select>

              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Ticket Name:
                </label>
                <input
                  type="text"
                  name="ticketname"
                  className="form-control"
                  id="recipient-name"
                  placeholder="Enter ticket name"
                  value={ticket.ticketname}
                  onChange={ticketdetailsOnChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  Ticket Description:
                </label>
                <textarea
                  className="form-control"
                  name="ticketdescription"
                  id="message-text1"
                  placeholder="Enter ticket description"
                  value={ticket.ticketdescription}
                  onChange={ticketdetailsOnChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  Acceptance Criteria:
                </label>
                <textarea
                  className="form-control"
                  name="acceptance_criteria"
                  id="message-text2"
                  placeholder="Enter acceptance criteria"
                  value={ticket.acceptance_criteria}
                  onChange={ticketdetailsOnChange}
                ></textarea>
              </div>
              <select
                className="form-control col-md-1"
                onChange={onUserSelection}
              >
                <option value="0"> --Change Assignee-- </option>
                {users &&
                  users.map((el) => {
                    return (
                      <option key={el.user_id} value={el.user_id}>
                        {el.user_name}
                      </option>
                    );
                  })}
              </select>
              <TagsInput
                onChange={(value) => {
                  console.log("TagsInp", { value });
                  tagsDataFromChildComponent(value);
                }}
                data={ticket.tags}
              />
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
