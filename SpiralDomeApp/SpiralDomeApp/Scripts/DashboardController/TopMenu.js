var topMenu = document.getElementById("TopMenu");

class TopMenu extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h3>Dashboard</h3>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a class="page-link" href="#">Account</a></li>
                        <li className="page-item"><a class="page-link" href="#">Finance</a></li>
                        <li className="page-item"><a class="page-link" href="#">Reminders</a></li>
                        <li className="page-item"><a class="page-link" href="#">Notes</a></li>
                        <li className="page-item"><a class="page-link" href="#">Documents</a></li>
                        <li onClick={this.logoutAction}><a class="page-link" href="#">Logout</a></li>
                    </ul>
                </nav>
            </React.Fragment>
            );
    }

    logoutAction = (e) => {
        localStorage.clear();
        window.location.href = "../Home/Index";
    }
}

ReactDOM.render(<TopMenu />, topMenu);