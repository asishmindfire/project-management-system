import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import service from "../services/ProjectService";

export default function UserAssignedTickets() {
  const location = useLocation();
  console.log({ location });
  const data = location.state.data;
  const [category, setCategory] = useState([]);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    console.log(`The request data for list of tickets ->`, data);
    service
      .fetchTicketsByUserid({
        user_id: data,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.data.length === 0) {
        } else {
          setTickets(res.data.data);
          console.log(`The request data for list of tickets ->`, data);
          service
            .getAllCategories()
            .then((resp) => {
              console.log(resp.data.data);
              setCategory(resp.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  const handleCategoryOnChange = (e) => {
    console.log(`handleCategoryOnChange -> `, e.target.value);

    service
      .fetchTicketsByUseridAndCategoryid({
        user_id: data,
        category_id: parseInt(e.target.value),
      })
      .then((filter_data) => {
        console.log(`Final data to render ->`, filter_data.data.data);
        setTickets(filter_data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">List of Tickets</h1>
      {/* <button>Filter</button> */}

      <select
        className="form-control col-md-1"
        //   value={projectdata}
        onChange={handleCategoryOnChange}
      >
        <option value="0"> --Select Category-- </option>
        {category && category.map((el) => {
          return (
            <option key={el.category_id} value={el.category_id}>
              {el.category_name}
            </option>
          );
        })}
      </select>

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
          {tickets && tickets.map((el) => {
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
