import React, {Component} from "react";
import HeaderComponent from "./HeaderComponent";
import moment from "moment";
import {Formik, Form, Field, ErrorMessage} from "formik";
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format("YYYY-MM-DD")
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {

        if (this.state.id === -1 ){ //ako e -1 ne prave retrieve na todo tuku novo
            return
        }
        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format("YYYY-MM-DD")
            }))
    }

    validate(values){
        let errors = {}
        if (!values.description){
            errors.description = 'Enter a description'
        } else if (values.description.length < 5){
            errors.description = 'Description must be more than 5 characters'
        }

        if (!moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter a valid Target Date'
        }
        return errors
    }

    onSubmit(values) {

        let username = AuthenticationService.getLoggedInUsername();

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        console.log('HERE', todo);
        if (this.state.id === -1 ){
            TodoDataService.createTodo(username, todo)
                .then( () => {this.props.history.push(`/todos`).catch((err) => console.log("ERROR", err))
            })
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo)
                .then( () => {this.props.history.push(`/todos`)
            })
        }



    }

    render() {

        let description = this.state.description
        let targetDate = this.state.targetDate

        return (
            <div>
                <HeaderComponent/>
                <br/>
                <h1>Todo</h1>
                <div className={"container"}>
                    <Formik
                        initialValues={{description: description, targetDate: targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className={"form-group"}>
                                        <label>Description</label>
                                        <Field className={"form-control"} type={"text"} name={"description"}/>
                                    </fieldset>

                                    <fieldset className={"form-group"}>
                                        <label>Target Date</label>
                                        <Field className={"form-control"} type={"date"} name={"targetDate"}/>
                                    </fieldset>
                                    <button className={"btn btn-success"} type={"submit"}>Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent;