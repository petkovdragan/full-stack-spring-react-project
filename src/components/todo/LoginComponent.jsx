import React, {Component} from 'react';
import AuthenticationService from "./AuthenticationService";
import HeaderComponent from "./HeaderComponent";

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'petkovdragan',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    changeHandler(event) {
        this.setState({[event.target.name]: event.target.value}) //event.target.value e vo [] zagradi zatoa sto e variabilno, a treba da bide konstantno, isto taka name = "" treba da bide isto so state imeto
    }

    //REFACTORED METHOD ABOVE
    // passwordChangeHandler (event) {
    //     this.setState({password: event.target.value})
    // }

    loginClicked() {
        //VALID HARDCODED VALUES = username: petkovdragan, password: something
        // if (this.state.username === 'petkovdragan' && this.state.password === 'something') {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     //this.setState({showSuccessMessage: true})
        //     //this.setState({hasLoginFailed: false})
        // } else {
        //     this.setState({showSuccessMessage: false})
        //     this.setState({hasLoginFailed: true})
        // }

        // AuthenticationService
        //     .executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .then(
        //         () => {
        //             AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //             this.props.history.push(`/welcome/${this.state.username}`)
        //         })
        //     .catch(
        //         () => {
        //             this.setState({showSuccessMessage: false})
        //             this.setState({hasLoginFailed: true})
        //         })

        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then(
                (resposnse) => {
                    AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, resposnse.data.token)
                    this.props.history.push(`/welcome/${this.state.username}`)
                })
            .catch(
                () => {
                    this.setState({showSuccessMessage: false})
                    this.setState({hasLoginFailed: true})
                })
    }

    render() {
        return (
            <div>
                <HeaderComponent/>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}

                    Username: <input type="text" name="username" value={this.state.username}
                                     onChange={this.changeHandler}/>
                    Password: <input type="password" name="password" value={this.state.password}
                                     onChange={this.changeHandler}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Log in</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent;
