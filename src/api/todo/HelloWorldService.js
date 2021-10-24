import axios from "axios";

class HelloWorldService {
    executeHelloWorldService(){
        return axios.get('http://localhost:8080/hello-world');
    }

    executeHelloWorldBeanService() {
        return axios.get('http://localhost:8080/hello-world-bean');
    }

    executeHelloWorldPathVariableService(name) {
        // let username = 'petkovdragan'
        // let password = 'something'
        //
        // let basicAuthenticationHeader = 'Basic ' + window.btoa(username + ":" + password)
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`
            // ,
            // {
            //     headers:{
            //         authorization: basicAuthenticationHeader
            //     }
            // }
        );
    }

}

export default new HelloWorldService();