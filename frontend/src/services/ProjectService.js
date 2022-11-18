import axios from "axios";

const getProjectListUrl = "http://localhost:8080/v1/fetchallprojects";
const addProjectListUrl = "http://localhost:8080/v1/addproject";

class ProjectService {
  getAllProjects() {
    return axios.get(getProjectListUrl);
  }

  addProject(projectdetails) {
    console.log(`=========>>>`, projectdetails);
    return axios.post(
      addProjectListUrl,
      projectdetails,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }
}

// Below we are exporting the object of employee, so that we acan directly use object in component.
// So we don't have to instantial a class object.
export default new ProjectService();
