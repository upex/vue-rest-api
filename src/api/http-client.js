import routes from './routes'
const headers = {
  'Content-Type': 'application/json;charset=utf-8'
};
export default { 
  methods: {
    /** Pushing Data with a POST Request */
    addUser(context, payload) {
      headers['Authorization'] = `some header value`
      const url = routes.user.USERS;
      return new Promise((resolve, reject) => {
        context.$http.post(url, payload, {headers})
          .then((response) => {
            resolve(response.body);
          }, (e) => {
            reject(e);
          });
      });
    }, 
    /** Fetching Data with a GET Request */
    getUsers(context) {
      const url = routes.user.USERS;
      return new Promise((resolve, reject) => {
        context.$http.get(url, {headers})
          .then((response) => {
            resolve(response.body);
          }, (e) => {
            reject(e);
          });
      });
    }
    /** similarly other requests PUT PATCH DELETE etc goes below */
  }
}