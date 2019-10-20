const LoginContainer = document.getElementById("LoginPanel");

class LoginPanel extends React.Component {

    constructor(props) {
        super(props);
        this.LoginModel = {
            LoginId: "",
            Password: ""
        }
        this.loginService = new LoginService();
    }

    render() {
        return (
            <React.Fragment>
                <h3>User Registration</h3>
                <input name="LoginId" value={this.LoginId} onChange={this.bindData} type="text" className="form-control" placeholder="Login Id" />
                <input name="Password" value={this.Password} onChange={this.bindData} type="password" className="form-control" placeholder="Password" />
                <br />
                <button onClick={this.LoginActionClick} className="btn btn-primary">Login</button>
                &nbsp;
                <button onClick={this.RegistrationActionClick} className="btn btn-success">New Registration</button>
            </React.Fragment>
            );
    }

    bindData = (e) => {
        this.LoginModel[e.target.name] = e.target.value;
        this.setState({ [e.target.name]: e.target.value });
    }

    LoginActionClick = (e) => {
        alert(this.LoginModel.LoginId + " " + this.LoginModel.Password );
        this.loginService.IsValidLogin(function (result) {
            alert(result);
        });
    }

    RegistrationActionClick = (e) => {
        alert("Go to registration");
    }
 
}

ReactDOM.render( <LoginPanel/>, LoginContainer);