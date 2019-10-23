var topMenu = document.getElementById("TopMenu");
var imgIcon = { width: '34px', height: '34px' };
var liCustom = { height: '47.5px' };
var ulTop = { margin: '0px' };

class TopMenu extends React.Component {

    render() {
        return (
            <React.Fragment>
                
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center" style={ulTop}>
                        <li className="page-item"><a className="page-link" href='#'> <img style={imgIcon} src='../Content/images/logo.png'></img></a></li>
                        <li className="page-item"><a className="page-link" href='#'> <input type='text' className='form-control' placeholder='Search by Name' /></a> &nbsp;</li>
                        <li className="page-item"><a className="page-link" href='#'> <button className='btn btn-primary'>Search</button></a></li>
                        <li onClick={this.accountAction} className="page-item"><a id="menuAcct" className="page-link" href="#"> <img style={imgIcon} src='../Content/images/account.svg'></img> Account</a></li>
                        <li onClick={this.logoutAction}><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/logout.svg'></img> Logout</a></li>
                    </ul>
                </nav>
            </React.Fragment>
            );
    }

    accountAction = (e) => {
        window.location.href = "../Dashboard/Account";
    }

    logoutAction = (e) => {
        localStorage.clear();
        window.location.href = "../Home/Index";
    }
}

ReactDOM.render(<TopMenu />, topMenu);

if (window.location.href.indexOf('Dashboard/Account') > 0) {
    $("#menuAcct").css("color", "black");
}