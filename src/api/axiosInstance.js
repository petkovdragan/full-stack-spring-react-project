const axios = require("axios");
const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 3000,
    // headers: {'X-Custom-Header': 'foobar'}
});


export default axios;