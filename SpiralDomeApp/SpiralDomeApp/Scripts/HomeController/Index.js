var LoginContainer = document.getElementById("LoginPanel");

class LoginPanel extends React.Component {

    constructor(props) {
        super(props);
        this.LoginModel = {
            LoginId: "",
            Password: ""
        }
        this.loginService = new LoginService();
        this.refErrorMessage = React.createRef();
        this.refSuccessMessage = React.createRef();
    }

    render() {
        return (
            <React.Fragment>
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
                <div ref={this.refErrorMessage} name="ErrorMessage" className="alert alert-danger" hidden></div>
                <div ref={this.refSuccessMessage} name="SuccessMessage" className="alert alert-success" hidden></div>
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
       
        var loginService = new LoginService();

        loginService.IsValidLogin(this.LoginModel, function (result) {
            if (result.IsSuccess) {
                localStorage.setItem("LoginId", result.JsonObject.Data.LoginId);
                localStorage.setItem("Token", result.JsonObject.Data.Token);
                window.location.href = "../Dashboard/Index";
            }
            else {
                $(self.refErrorMessage.current).show().html(result.Message);
            }
        });
    }

    RegistrationActionClick = (e) => {
        window.location.href = "../Home/Register";
    }
 
}

ReactDOM.render( <LoginPanel/>, LoginContainer);