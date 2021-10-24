import React, {Component} from "react";
import HeaderComponent from "./HeaderComponent";

class LogoutComponent extends Component {

    render() {
        return (
            <>
                <HeaderComponent/>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank You For Using Our Application
                </div>
            </>
        )
    }
}
export default LogoutComponent;