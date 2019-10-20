﻿var LoginContainer = document.getElementById("LoginPanel");
var _self = null;

class LoginPanel extends React.Component {

    constructor(props) {
        super(props);
        _self = this;
        _self.LoginModel = {
            LoginId: "",
            Password: ""
        }
        _self.loginService = new LoginService();
    }

    render() {
        return (
            <React.Fragment>
                <h3>User Login</h3>
                <input name="LoginId" value={_self.LoginId} onChange={_self.bindData} type="text" className="form-control" placeholder="Login Id" />
                <input name="Password" value={_self.Password} onChange={_self.bindData} type="password" className="form-control" placeholder="Password" />
                <div>
                    <br />
                    <button onClick={_self.LoginActionClick} className="btn btn-primary">Login</button>
                    &nbsp;
                    <button onClick={_self.RegistrationActionClick} className="btn btn-success">New Registration</button>
                </div>           
            </React.Fragment>
            );
    }

    bindData = (e) => {
        _self.LoginModel[e.target.name] = e.target.value;
        _self.setState({ [e.target.name]: e.target.value });
    }

    LoginActionClick = (e) => {
        alert(_self.LoginModel.LoginId + " " + _self.LoginModel.Password );
        _self.loginService.IsValidLogin(function (result) {
            alert(result);
        });
    }

    RegistrationActionClick = (e) => {
        window.location.href = "../Home/Register";
    }
 
}

ReactDOM.render( <LoginPanel/>, LoginContainer);