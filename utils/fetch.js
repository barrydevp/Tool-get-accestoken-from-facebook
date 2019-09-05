import axios from 'axios';

export default (url, options) => {
  return axios.get(url, {
    ...options
  })
    .then(function (response) {

      return Promise.resolve(response);
    })
    .catch(function (error) {
      const { response: { data } } = error;

      if (data && data.error && data.error.type === 'OAuthException') {
        return Promise.resolve(error.response);
      }

      return Promise.reject(error);
    });
}
