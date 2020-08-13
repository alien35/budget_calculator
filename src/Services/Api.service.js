import axios from 'axios';

export default class ApiService {

  // ======================================================
  // Public methods
  // ======================================================

  static async post({
    endpoint,
    payload,
    headers
  }) {
    const options = {
      url: endpoint,
      method: 'POST',
      headers,
      data: payload,
    };
    return await axios(options);
  }

  static async get({
    endpoint,
    payload,
    headers
  }) {
    const options = {
      url: endpoint,
      method: 'GET',
      headers,
      data: payload,
    };
    return await axios(options);
  }

  static async put({
    endpoint,
    payload,
    headers
  }) {
    const options = {
      url: endpoint,
      method: 'PUT',
      headers,
      data: payload,
    };
    return await axios(options);
  }

}
