import { useLocation } from "react-router-dom";

export default function Ticket() {
  const location = useLocation();
  const data = location.state.data;
  console.log(`Ticket details ->`, data);

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">Ticket - {data.ticketId}</h1>
        </div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>Ticket Name</td>
              <td>{data.ticketname}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{data.ticketdescription}</td>
            </tr>
            <tr>
              <td>Acceptance Criteria</td>
              <td>{data.acceptance_criteria}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{data.status}</td>
            </tr>
            <tr>
              <td>Category Type</td>
              <td>{data.category_name}</td>
            </tr>
            <tr>
              <td>Tags</td>
              <td>{data.tags.map((el) => <button className="btn btn-info" type="submit">{el}</button>)}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary" type="submit">Update</button>
      </div>
    </div>
  );
}
