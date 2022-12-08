import { useState } from "react";
import { useLocation } from "react-router-dom";
import UpdateTicketModal from "./UpdateTicketModal";

export default function Ticket() {
  const location = useLocation();
  const data = location.state.data;
  console.log(`Ticket details ->`, data);
  const [updatedTicket, setUpdatedTicket] = useState(data);

  const handleOnChange = (value) => {
    console.log(`tickets data from child component ->`, value);
    setUpdatedTicket(value);
  };

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">Ticket - {updatedTicket.ticketId}</h1>
        </div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>Ticket Name</td>
              <td>{updatedTicket.ticketname}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{updatedTicket.ticketdescription}</td>
            </tr>
            <tr>
              <td>Acceptance Criteria</td>
              <td>{updatedTicket.acceptance_criteria}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{updatedTicket.status}</td>
            </tr>
            <tr>
              <td>Category Type</td>
              <td>{updatedTicket.category_name}</td>
            </tr>
            <tr>
              <td>Tags</td>
              <td>
                <div className="ticket-tags-input-container">
                  {updatedTicket.tags &&
                    updatedTicket.tags.map((el, index) => {
                      return (
                        <div className="ticket-tags-items" key={index}>
                          <span className="text">{el}</span>
                          {/* <span className="close">&times;</span> */}
                        </div>
                      );
                    })}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <UpdateTicketModal
          onChange={(value) => {
            console.log({ value });
            handleOnChange(value);
          }}
          ticketDetails={updatedTicket}
        />
      </div>
    </div>
  );
}
