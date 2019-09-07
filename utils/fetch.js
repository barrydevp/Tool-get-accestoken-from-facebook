import axios from 'axios';

export default (url, options) => {
  return axios.get(url, {
    ...options
  })
    .then(function (response) {

      return Promise.resolve(response);
    })
    .catch(function (error) {
      
      return Promise.reject(error);
    });
}
