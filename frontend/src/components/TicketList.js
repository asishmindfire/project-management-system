import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import service from "../services/ProjectService";

export default function TicketList(props) {
  const location = useLocation();
  const data = location.state.data;
  const [tickets, setTickets] = useState([]);

  // console.log(`props data ->`, data);

  useEffect(() => {
    console.log(`The request data ->`, data);
    service
      .allTicketsUnderProject({
        projectId: data,
      })
      .then((res) => {
        setTickets(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  return (
    <div className="container my-5">
      <h1 className="text-center">List of Tickets</h1>
      {/* <button>Filter</button> */}
      <table className="table table-bordered table-striped my-4">
        <thead>
          <tr>
            <th scope="col">Ticket Name</th>
            <th scope="col">Description</th>
            {/* <th scope="col">acceptance_criteria:</th> */}
            {/* <th scope="col">status:</th> */}
            {/* <th scope="col">assign_to:</th> */}
            {/* <th scope="col">created_by:</th> */}
            <th scope="col">Category Type</th>
            {/* <th scope="col">tags:</th> */}
          </tr>
        </thead>
        <tbody>
          {tickets.map((el) => {
            return (
              <tr>
                <td> {el.ticketname} </td>
                <td> {el.ticketdescription} </td>
                <td> {el.category_name} </td>
                <td>
                  <Link
                    className="btn btn-primary my-2 mx-3"
                    role="button"
                    to="/ticket"
                    state={{ data: el }}
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
