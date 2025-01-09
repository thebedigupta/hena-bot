const axios = require('axios');
require('dotenv').config();

const MY_TOKEN = process.env.MY_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;

function getAxiosInstance() {
  return {
    get(method, params) {
      return axios
        .get(`/${method}`, {
          baseURL: BASE_URL,
          params,
        })
        .catch((error) => {
          console.error(`Error in GET ${method}:`, error);
          throw error;
        });
    },
    post(method, data) {
      return axios({
        method: 'post',
        baseURL: BASE_URL,
        url: `/${method}`,
        data,
      }).catch((error) => {
        console.error(`Error in POST ${method}:`, error);
        throw error;
      });
    },
  };
}

module.exports = {
  axiosInstance: getAxiosInstance(),
};
