import React, {Component} from "react";
import HeaderComponent from "./HeaderComponent";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";

class ListTodosComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.editTodoClicked = this.editTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount() {
        this.refreshTodos();
    }


    refreshTodos() {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retrieveAllTodos(username)
            .then(response => {
                this.setState({todos: response.data})
            })
        console.log("refresh todos")
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({message: `The todo with id ${id} was successfully deleted`})
                    this.refreshTodos()
                }
            )
    }

    editTodoClicked(id) {
        // /todos/${id}
        this.props.history.push(`/todos/${id}`)
    }

        addTodoClicked() {
            this.props.history.push(`/todos/-1`)
        }

    render() {
        return (
            <div>
                <HeaderComponent/>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Description</th>
                            <th>Is Completed?</th>
                            <th>Target Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map(
                                todo => <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td>
                                        <button className={"btn btn-warning"}
                                                onClick={() => this.editTodoClicked(todo.id)}>Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button className={"btn btn-danger"}
                                                onClick={() => this.deleteTodoClicked(todo.id)}>Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListTodosComponent;