import axios from "axios";

class loggedInUserAPI {
  constructor() {
      return axios.create({
          baseURL: "http://localhost:5000/api/users/",
          headers: {
              "x-access-token": sessionStorage.getItem("jwtToken")
          }
      });
  }
}

export default loggedInUserAPI;