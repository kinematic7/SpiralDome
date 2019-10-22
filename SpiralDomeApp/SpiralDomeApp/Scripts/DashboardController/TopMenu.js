var topMenu = document.getElementById("TopMenu");
var imgIcon = { width: '34px', height: '34px' };
var ulTop = { margin: '0px' };

class TopMenu extends React.Component {

    render() {
        return (
            <React.Fragment>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center" style={ulTop}>
                        <li className="page-item"><a className="page-link" href='#'> <img style={imgIcon} src='../Content/images/logo.png'></img></a></li>
                        <li className="page-item"><a className="page-link" href='#'> <input type='text' className='form-control' placeholder='Search by Name' /></a></li>
                        <li className="page-item"><a id="menuAcct" className="page-link" href="#"> <img style={imgIcon} src='../Content/images/account.png'></img> Account</a></li>
                        <li className="page-item"><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/finance.png'></img> Finance</a></li>
                        <li className="page-item"><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/reminder.png'></img> Reminders</a></li>
                        <li className="page-item"><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/notes.png'></img>  Notes</a></li>
                        <li className="page-item"><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/document.png'></img> Documents</a></li>
                        <li onClick={this.logoutAction}><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/logout.png'></img> Logout</a></li>
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

if (window.location.href.indexOf('Dashboard/Account') > 0) {
    $("#menuAcct").css("color", "red");
}