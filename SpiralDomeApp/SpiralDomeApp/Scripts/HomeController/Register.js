var RegistrationComponent = document.getElementById("RegistrationPanel");

class RegistrationPanel extends React.Component {

    constructor(props) {
        super(props);
        this.RegistrationModel =
            {
                LoginId: "", Password: "", ConfirmPassword : ""
            };
        this.id = new Date().getTime();
    }

    render() {
        return (
            <React.Fragment>
                <div id={this.id}>
                    <h3>User Registration</h3>
                    <input name="LoginId" type="text" value={this.RegistrationModel.LoginId} onChange={this.bind_RegistrationModel} className="form-control" placeholder="Login ID"  />
                    <input name="Password" type="password" value={this.RegistrationModel.Password} onChange={this.bind_RegistrationModel} className="form-control" placeholder="Password" />
                    <input name="ConfirmPassword" type="password" value={this.RegistrationModel.ConfirmPassword} onChange={this.bind_RegistrationModel} className="form-control" placeholder="Confirm Password" />
                    <div>
                    <br/>
                        <button name="btnRegister" onClick={this.RegistrationEventClick} className="btn btn-primary">Register</button>
                        &nbsp;
                        <button onClick={this.BacktoLoginEventClick} className="btn btn-success">Back to Login</button>
                    </div>
                    <br /> &nbsp;
                    <div name="ErrorMessage" className="alert alert-danger" hidden ></div>
                    <div name="SuccessMessage" className="alert alert-success" hidden></div>
                </div>       
            </React.Fragment>
        );
    }

    bind_RegistrationModel = (e) => {
        this.RegistrationModel[e.target.name] = e.target.value;
        this.setState({ [e.target.name]: e.target.value });
    }

    SetControlValue = (name, value) => {
        this.RegistrationModel[name] = value;
        this.setState({ [name]: value });
    }

    RegistrationEventClick = (e) => {

        var self = this;
        var parent = $("#" + self.id);
        parent.find('[name="ErrorMessage"]').hide();
        parent.find('[name="SuccessMessage"]').hide();

        var loginService = new LoginService();

        loginService.InsertLogin(this.RegistrationModel, function (result) {
          
            if (result.IsSuccess) {
                parent.find('[name="SuccessMessage"]').show().html("You are now registered!")
                parent.find('[name=btnRegister]').prop("disabled", true);

            }
            else {
                self.SetControlValue("LoginId", "");
                self.SetControlValue("Password", "");
                parent.find('[name="ErrorMessage"]').show().html(result.Message);
            }
        });
    }

    BacktoLoginEventClick = (e) => {
        window.location.href = "../Home/Index";
    }
}

ReactDOM.render(<RegistrationPanel />, RegistrationComponent);