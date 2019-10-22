var topMenu = document.getElementById("TopMenu");

class TopMenu extends React.Component {

    render() {
        return (
            <React.Fragment>
                <nav aria-label="Page navigation example">
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrzkWPAFu2gErSq1g6cQ34c6f8WoR5l_g9n4iUuK1LgX2Vxu68'></img>
                    <ul className="pagination">
                        <li className="page-item"><a id="menuAcct" className="page-link" href="#">➤ Account</a></li>
                        <li className="page-item"><a className="page-link" href="#">➤ Finance</a></li>
                        <li className="page-item"><a className="page-link" href="#">➤ Reminders</a></li>
                        <li className="page-item"><a className="page-link" href="#">➤ Notes</a></li>
                        <li className="page-item"><a className="page-link" href="#">➤ Documents</a></li>
                        <li onClick={this.logoutAction}><a class="page-link" href="#">✖ Logout</a></li>
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

$("#menuAcct").css("color", "red");