var LoginContainer = document.getElementById("LoginPanel");

class LoginPanel extends React.Component {

    constructor(props) {
        super(props);
        this.LoginModel = {
            LoginId: "",
            Password: ""
        }
        this.loginService = new LoginService();
        this.id = new Date().getTime();
    }

    render() {
        return (
            <React.Fragment>
                <div id={this.id}>
                    <h3>User Login</h3>
                    <input name="LoginId" value={this.LoginId} onChange={this.bindData} type="text" className="form-control" placeholder="Login Id" />
                    <input name="Password" value={this.Password} onChange={this.bindData} type="password" className="form-control" placeholder="Password" />
                    <div>
                        <br />
                        <button onClick={this.LoginActionClick} className="btn btn-primary">Login</button>
                        &nbsp;
                        <button onClick={this.RegistrationActionClick} className="btn btn-success">New Registration</button>
                    </div>           
                    <br/> &nbsp;
                    <div name="ErrorMessage" className="alert alert-danger" hidden></div>
                    <div name="SuccessMessage" className="alert alert-success" hidden></div>
                </div>
            </React.Fragment>
            );
    }

    bindData = (e) => {
        this.LoginModel[e.target.name] = e.target.value;
        this.setState({ [e.target.name]: e.target.value });
    }

    LoginActionClick = (e) => {

        localStorage.clear();
        var self = this;
        var parent = $("#" + this.id);
        parent.find("[name='ErrorMessage']").hide();
        parent.find("[name='SuccessMessage']").hide();

        var loginService = new LoginService();

        loginService.IsValidLogin(this.LoginModel, function (result) {
            if (result.IsSuccess) {
                localStorage.setItem("LoginId", result.JsonObject.Data.LoginId);
                localStorage.setItem("Token", result.JsonObject.Data.Token);
                window.location.href = "../Dashboard/Index";
            }
            else {
                parent.find("[name='ErrorMessage']").show().html(result.Message);
            }
        });
    }

    RegistrationActionClick = (e) => {
        window.location.href = "../Home/Register";
    }
 
}

ReactDOM.render( <LoginPanel/>, LoginContainer);