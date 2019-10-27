var topMenu = document.getElementById("TopMenu");
var imgIcon = { width: '34px', height: '34px' };
var liCustom = { height: '47.5px' };
var ulTop = { margin: '0px' };

class TopMenu extends React.Component {

    constructor(props) {
        super(props);
        this.refSearchByName = React.createRef();
        
    }
    render() {
        if (localStorage == null || localStorage.length == 0) {
            window.location.href = "../Home/Index";
        }
        return (
            <React.Fragment>                
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center" style={ulTop}>
                        <li className="page-item"><a className="page-link" href='#'> <img style={imgIcon} src='../Content/images/logo.png'></img></a></li>
                        <li className="page-item"><a className="page-link" href='#'> <input ref={this.refSearchByName} onChange={this.searchAction } type='text' className='form-control' placeholder='Search by Name' /></a> &nbsp;</li>
                        <li onClick={this.accountAction} className="page-item"><a id="menuAcct" className="page-link" href="#"> <img style={imgIcon} src='../Content/images/account.svg'></img> Accounts</a></li>
                        <li onClick={this.reminderAction}><a className="page-link" id="menuReminder" href="#"><img style={imgIcon} src='../Content/images/reminders.svg'></img> Reminders</a></li>
                        <li onClick={this.documentAction}><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/documents.svg'></img> Documents</a></li>
                        <li onClick={this.logoutAction}><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/logout.svg'></img> Logout</a></li>
                    </ul>
                </nav>
            </React.Fragment>
            );
    }

    accountAction = (e) => {
        window.location.href = "../Dashboard/Account";
    }

    reminderAction = (e) => {
        window.location.href = "../Dashboard/Reminder";
    }

    documentAction = (e) => {
        window.location.href = "c:\documents\documents.pdf";
    }

    logoutAction = (e) => {
        localStorage.clear();
        window.location.href = "../Home/Index";
    }

    searchAction = (e) => {
        this.props.ParentControl.searchByName(this.refSearchByName.current.value);
    }
}

    //<li onClick={this.logoutAction}><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/reminders.svg'></img> Reminders</a></li>
    //<li onClick={this.logoutAction}><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/creditcard.svg'></img> Payments</a></li>
    //<li onClick={this.logoutAction}><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/documents.svg'></img> Documents</a></li>
    //<li onClick={this.logoutAction}><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/notes.svg'></img> Notes</a></li>
    //<li onClick={this.logoutAction}><a className="page-link" href="#"><img style={imgIcon} src='../Content/images/settings.svg'></img> Settings</a></li>

//ReactDOM.render(<TopMenu />, topMenu);

