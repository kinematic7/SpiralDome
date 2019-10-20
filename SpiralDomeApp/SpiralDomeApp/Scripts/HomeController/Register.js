var rootNode = document.getElementById("Home.Register");
var RegistrationComponent = document.getElementById("RegistrationPanel");

class RegistrationPanel extends React.Component {

    constructor(props) {
        super(props);
        this.RegistrationModel =
            {
                LoginId: "", Password: "", ConfirmPassword : ""
            };
    }

    render() {
        return (
            <React.Fragment>
                <h3>User Registration</h3>
                <input name="LoginId" type="text" value={this.RegistrationModel.LoginId} onChange={this.bind_RegistrationModel} className="form-control" placeholder="Login ID"  />
                <input name="Password" type="password" value={this.RegistrationModel.Password} onChange={this.bind_RegistrationModel} className="form-control" placeholder="Password" />
                <input name="ConfirmPassword" type="password" value={this.RegistrationModel.ConfirmPassword} onChange={this.bind_RegistrationModel} className="form-control" placeholder="Confirm Password" />
                <br/>
                <button onClick={this.RegistrationEventClick} className="btn btn-primary">Register</button>
                &nbsp;
                <button onClick={this.BacktoLoginEventClick} className="btn btn-success">Back to Login</button>
                <br/> &nbsp;
                <div name="ErrorMessage" className="alert alert-danger" hidden></div>
                <div name="SuccessMessage" className="alert alert-success" hidden></div>
            </React.Fragment>
        );
    }

    bind_RegistrationModel = (e) => {
        this.RegistrationModel[e.target.name] = e.target.value;
        this.setState({ [e.target.name]: e.target.value });
    }

    RegistrationEventClick = (e) => {

        var successAlert = this.FindControl("SuccessMessage");
        var failAlert = this.FindControl("ErrorMessage");
        failAlert.hide();
        successAlert.hide();


        var loginService = new LoginService();
        loginService.InsertLogin(this.RegistrationModel, function(result) {
            if (result.IsSuccess != true) {
                failAlert.show();
                failAlert.html(result.Message);
                this.SetControlValue("LoginId", "");
                this.SetControlValue("Password", "");
                this.SetControlValue("ConfirmPassword", "");
            }
            else {
                successAlert.show();
                successAlert.html("You are now registered!");
            }
        });
    }

    FindControl = (name) => {
        return $(rootNode).find("[name=" + name + "]");
    }

    SetControlValue = (name, value) => {
        this.RegistrationModel[name] = value;
        this.setState({ [name]: value});
    }

    BacktoLoginEventClick = (e) => {
        alert("Back to Login");
    }
}

ReactDOM.render(<RegistrationPanel />, RegistrationComponent);