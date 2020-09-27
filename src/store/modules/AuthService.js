import axios from "axios";
import config from "@/store/modules/config";

const AuthService = {
  authRequest() {
    return axios
      .post(`${config.apiUrl}/auth`, { apiKey: config.apiKey })
      .then(answer => {
        return answer.data.token;
      });
  },
  setToken(token) {
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  }
};

export default AuthService;
