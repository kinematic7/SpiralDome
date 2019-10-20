var rootNode = document.getElementById("Home.Register");
var RegistrationComponent = document.getElementById("RegistrationPanel");
var _self = null;

class RegistrationPanel extends React.Component {

    constructor(props) {
        super(props);
        _self = this;
        _self.RegistrationModel =
            {
                LoginId: "", Password: "", ConfirmPassword : ""
            };
    }

    render() {
        return (
            <React.Fragment>
                <h3>User Registration</h3>
                <input name="LoginId" type="text" value={_self.RegistrationModel.LoginId} onChange={_self.bind_RegistrationModel} className="form-control" placeholder="Login ID"  />
                <input name="Password" type="password" value={_self.RegistrationModel.Password} onChange={_self.bind_RegistrationModel} className="form-control" placeholder="Password" />
                <input name="ConfirmPassword" type="password" value={_self.RegistrationModel.ConfirmPassword} onChange={_self.bind_RegistrationModel} className="form-control" placeholder="Confirm Password" />
                <div>
                <br/>
                    <button name="btnRegister" onClick={_self.RegistrationEventClick} className="btn btn-primary">Register</button>
                    &nbsp;
                    <button onClick={_self.BacktoLoginEventClick} className="btn btn-success">Back to Login</button>
                </div>
                <br /> &nbsp;
                <div name="ErrorMessage" className="alert alert-danger" hidden></div>
                <div name="SuccessMessage" className="alert alert-success" hidden></div>
            </React.Fragment>
        );
    }

    bind_RegistrationModel = (e) => {
        _self.RegistrationModel[e.target.name] = e.target.value;
        _self.setState({ [e.target.name]: e.target.value });
    }

    RegistrationEventClick = (e) => {
        var successAlert = _self.FindControl("SuccessMessage");
        var failAlert = _self.FindControl("ErrorMessage");
        failAlert.hide();
        successAlert.hide();

        var loginService = new LoginService();

        loginService.InsertLogin(_self.RegistrationModel, function(result) {
            if (result.IsSuccess != true) {
                failAlert.show();
                failAlert.html(result.Message);
                _self.SetControlValue("LoginId", "");
                _self.SetControlValue("Password", "");
                _self.SetControlValue("ConfirmPassword", "");
            }
            else {
                successAlert.show();
                successAlert.html("You are now registered!");
                _self.FindControl("btnRegister").prop("disabled", true);
            }
        });
    }

    FindControl = (name) => {
        return $(rootNode).find("[name=" + name + "]");
    }

    SetControlValue = (name, value) => {
        _self.RegistrationModel[name] = value;
        _self.setState({ [name]: value});
    }

    BacktoLoginEventClick = (e) => {
        window.location.href = "../Home/Index";
    }
}

ReactDOM.render(<RegistrationPanel />, RegistrationComponent);