import axios from "axios";
import {API_URL, JPA_API_URL} from "../../Constants";

class TodoDataService {

    createTodo(name, todo) {
        return axios.post(`${JPA_API_URL}/users/${name}/todos`, todo,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
    }

    retrieveAllTodos(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
    }


    retrieveTodo(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
    }

    updateTodo(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
    }

    deleteTodo(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
    }
}

export default new TodoDataService()