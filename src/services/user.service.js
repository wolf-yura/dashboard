import axios from 'axios';
import authHeader from './auth-header';
const URL = 'http://localhost:8080/api/user/';

class UserService {
  // getPublicContent() {
  //   return axios.get(AUTH_URL + 'all');
  // }
  // getUserBoard() {
  //   return axios.get(AUTH_URL + 'user', { headers: authHeader() });
  // }
  // getAdminBoard() {
  //   return axios.get(AUTH_URL + 'admin', { headers: authHeader() });
  // }
  getAllUsers() {
    return axios.get(URL + 'all', {headers: authHeader()});
  }
  getActiveUsers() {
    return axios.get(URL + 'activeall', {headers: authHeader()});
  }
  getOneUser(userId) {
    return axios.post(URL + 'one', {id: userId}, {headers: authHeader()});
  }
  setActive(userId, active, investment) {
    return axios
      .post(URL + "setActive", {id: userId, active: active, investment:investment}, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  delete(userId) {
    return axios
      .post(URL + "delete", {id: userId}, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
  update(user) {
    return axios
      .post(URL + "update", user, {headers: authHeader()})
      .then(response => {
        return response.data;
      });
  }
}

export default new UserService();
