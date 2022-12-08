import { useState, useEffect } from "react";
import axios from "axios";
import TagsInput from "./TagsInput";
import service from "../services/ProjectService";

export default function AddTicketModal(props) {
  console.log(`props data in addTicketModal ->`, props.data);
  const [ticket, setTicket] = useState({
    ticketId: 0,
    projectId: props.data,
    ticketname: "",
    ticketdescription: "",
    created_by: 0,
    assign_to: 0,
    acceptance_criteria: "",
    status: "BACKLOG",
    category_name: "",
    tags: [],
  });

  const [users, setUsers] = useState([]);
  //   const [tags, setTags] = useState([]);
  //   const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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
          setTicket({ ...ticket, created_by: user_data.data.data.user_id });

          axios
            .get("http://localhost:8080/fetch-all-user")
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
        } else {
          alert(user_data.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onCategorySelection = (e) => {
    console.log(`onCategorySelection`, e.target.value);
    setTicket({ ...ticket, category_name: e.target.value });
  };

  const onUserSelection = (e) => {
    console.log(`onUserSelection`, e.target.value);
    setTicket({ ...ticket, assign_to: e.target.value });
  };

  const ticketdetailsOnChange = (e) => {
    console.log(`ticketdetailsOnChange ->`, e.target.name, e.target.value);
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const tagsDataFromChildComponent = (e) => {
    // console.log(`tagsDataFromChildComponent ->`, e);
    setTicket({ ...ticket, tags: e });
  };

  const handleOnSubmit = (e) => {
    // e.preventDefault();
    console.log({ ticket });
    service
      .addTicket(ticket)
      .then((resp) => {
        console.log(`Response from addTicket ->`, resp);
        // setTicket({
        //   ticketId: 0,
        //   projectId: props.data,
        //   ticketname: "",
        //   ticketdescription: "",
        //   created_by: 0,
        //   assign_to: 0,
        //   acceptance_criteria: "",
        //   status: "BACKLOG",
        //   category_name: "",
        //   tags: [],
        // });

        // console.log(`setShowModalsetShowModal ->`, showModal);
        // setShowModal(false);
        // console.log(`setShowModalsetShowModal ------>`, showModal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const openModal = () => {
  //     setShowModal(true);
  //   };

  return (
    // <div>
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        // onClick={() => setShowModal(true)}
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addTicketModal"
        // data-backdrop="false"
      >
        Add Ticket
      </button>

      {/* <!-- Modal --> */}
      {/* {(showModal) && ( */}
      <div
        className="modal fade"
        //   style={{zIndex: '999999999'}}
        id="addTicketModal"
        tabIndex="-1"
        aria-labelledby="addTicketModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addTicketModalLabel">
                Add Ticket
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <form onSubmit={handleOnSubmit}> */}
              <select
                className="form-control col-md-1"
                onChange={onCategorySelection}
              >
                <option value="0"> --Select Category-- </option>
                <option value="Bug"> BUG </option>
                <option value="Task"> TASK </option>
                <option value="Feature"> FEATURE </option>
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
                <option value="0"> --Assign To-- </option>
                {users && users.map((el) => {
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
              {/* </form> */}
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Add
              </button>
            </div> */}
          </div>
        </div>
      </div>
      {/* //   )} */}
    </div>
    // </div>
  );
}
