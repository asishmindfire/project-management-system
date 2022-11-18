import { useLocation } from "react-router-dom";

export default function TicketList(props) {
  const location = useLocation();
  const data = location.state?.data;
  const data1 = location.state?.projectId;

  console.log(`props data ->`, data);
  console.log(`f------> `, data1);
  
  return (
    <div className="container my-5">
      <h1 className="text-center">List of Tickets</h1>

      <table className="table table-bordered table-striped my-4">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Ticket</th>
            <th scope="col">Description</th>
            <th scope="col">Tags</th>
            <th scope="col">AssignTo</th>
            <th scope="col">Acceptance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => {
            return (
              <tr>
                <td> {el.ticketId} </td>
                <td> {el.ticketname} </td>
                <td> {el.ticketdescription} </td>
                <td> {el.tags.map((ele) => <button class="btn btn-primary my-1 mx-1">{ele}</button>)} </td>
                <td> {el.assignTo} </td>
                <td> {el.acceptance} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
