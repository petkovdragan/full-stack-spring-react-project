import {API_URL} from "../../Constants";
import axios from "../../api/axiosInstance";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeBasicAuthenticationService(username, password){
        return axios.get(`${API_URL}/basicauth`,
            {
                headers: {
                    authorization: this.createBasicAuthenticationToken(username, password),
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                }
            })
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    createBasicAuthenticationToken(username, password){
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        //let basicAuthenticationHeader = 'Basic ' + window.btoa(username + ":" + password);
        //IMPORTANT: Data stored in localStorage has no expiration time. You need to explicitly delete it !
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthenticationToken(username, password));
    }

    registerSuccessfulLoginForJwt(username,token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);

        sessionStorage.setItem('jwt', token);

        this.setupAxiosInterceptors(this.createJWTHeader(token));
    }

    createJWTHeader(token) {
        return 'Bearer ' +  token
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUsername() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }

}

export default new AuthenticationService()

/*IMPORTANT: For react components we export the class directly.
For Helper Services we export an instance of the class - an object.
*/
