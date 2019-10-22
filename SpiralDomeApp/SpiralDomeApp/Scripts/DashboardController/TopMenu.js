var topMenu = document.getElementById("TopMenu");

class TopMenu extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h3>Dashboard</h3>
                <a href="#">Account</a>
                &nbsp; - &nbsp;
                <a href="#" onClick={this.logoutAction}>Logout</a>
            </React.Fragment>
            );
    }

    logoutAction = (e) => {
        localStorage.clear();
        window.location.href = "../Home/Index";
    }
}

ReactDOM.render(<TopMenu />, topMenu);