import axios from "axios";

// const getProjectListUrl = "http://localhost:8080/fetchallprojects";
// const addProjectListUrl = "http://localhost:8080/insert-project";
const baseUrl = "http://localhost:8080";

class ProjectService {
  getAllProjects() {
    return axios.get(baseUrl + "/fetchallprojects");
  }

  addProject(projectdetails) {
    console.log(`=========>>>`, projectdetails);
    return axios.post(baseUrl + "/insert-project", projectdetails, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  userRegistration(request_data) {
    console.log(`=========>>>`, request_data);
    return axios.post(baseUrl + "/register", request_data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  userLogin(request_data) {
    console.log(`=========>>>`, request_data);
    return axios.post(baseUrl + "/login", request_data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  allTicketsUnderProject(request_data) {
    console.log(`=========>>>`, request_data);
    return axios.post(baseUrl + "/tickets-by-projectid", request_data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  addTicket(request_data) {
    console.log(`=========>>>`, request_data);
    return axios.post(baseUrl + "/insert-ticket", request_data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  fetchTicketsByUserid(request_data) {
    console.log(`=========>>>`, request_data);
    return axios.post(baseUrl + "/tickets-by-userid", request_data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  getAllCategories() {
    return axios.get(baseUrl + "/get-all-categories");
  }

  fetchTicketsByUseridAndCategoryid(request_data) {
    console.log(`=========>>>`, request_data);
    return axios.post(baseUrl + "/tickets-by-categoryandtags", request_data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  updateTicketDeatils(request_data) {
    console.log(`=========>>>`, request_data);
    return axios.post(baseUrl + "/update-ticket", request_data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("usertoken"),
      },
    });
  }

  updateProjectDeatils(request_data) {
    console.log(`=========>>>`, request_data);
    return axios.post(baseUrl + "/update-project", request_data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("usertoken"),
      },
    });
  }


  getAllUsers() {
    return axios.get(baseUrl + "/fetch-all-user");
  }
}

// Below we are exporting the object of employee, so that we acan directly use object in component.
// So we don't have to instantial a class object.
export default new ProjectService();
