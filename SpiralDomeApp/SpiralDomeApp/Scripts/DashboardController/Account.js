var AccountContainer = document.getElementById("AccountPanel");

class AccountPanel extends React.Component {

    constructor(props) {
        super(props);
        this.ref_Name = React.createRef();
        this.ref_Url = React.createRef();
        this.ref_Username = React.createRef();
        this.ref_Password = React.createRef();
        this.ref_Comment = React.createRef();
        this.AccountModel = { Name: "", Url: "", Username: "", Password: "", Comment: "" }
        this.actSvc = new AccountService();
    }

    render() {

        this.fillGrid(this);

        return (
            <React.Fragment>
                <TopMenu  ParentControl={this}/>
                <br/>
                <div className="form-inline">
                    <input ref={this.ref_Name} name="Name" onChange={this.bind} type="text" className="form-control" placeholder="Name" />
                    &nbsp;
                    <input ref={this.ref_Url} name="Url" onChange={this.bind} type="text" className="form-control" placeholder="Url" />
                    &nbsp;
                    <input ref={this.ref_Username} onChange={this.bind} name="Username" type="text" className="form-control" placeholder="Username" />
                    &nbsp;
                    <input ref={this.ref_Password} onChange={this.bind} name = "Password" type="text" className="form-control" placeholder="Password" />
                    &nbsp;
                    <input ref={this.ref_Comment} onChange={this.bind} name="Comment" type="text" className="form-control" placeholder="Comment" />
                    &nbsp;
                    &nbsp;
                    <button onClick={this.updateAccountObject} className='btn btn-primary btn-sm' title='update'>Update</button>
                    &nbsp;
                    <button onClick={this.deleteAccountObject} className='btn btn-danger btn-sm' title='delete'>Delete</button>
                </div>
            </React.Fragment>
            );
    }

    bind = (e) => {
        this.AccountModel[e.target.name] = e.target.value.trim();
        this.setState({ [e.target.name]: e.target.value.trim() });
    }

    searchByName = (searchValue) => {
        this.fillGrid(this, searchValue);
    }

    updateAccountObject = (e) => {
        var self = this;
        this.actSvc.UpdateAccount(this.AccountModel, function (result) {
            self.setControlValue(self.ref_Name, self.AccountModel, "");
            self.setControlValue(self.ref_Username, self.AccountModel, "");
            self.setControlValue(self.ref_Password, self.AccountModel, "");
            self.setControlValue(self.ref_Url, self.AccountModel, "");
            self.setControlValue(self.ref_Comment, self.AccountModel, "");
            if (result.IsSuccess) {
                self.fillGrid(self);
            }
            else {
                alert(result.Message);
            }
        });
    }

    deleteAccountObject = (e) => {
        var self = this;
        this.actSvc.DeleteAccount(this.AccountModel, function (result) {
            self.setControlValue(self.ref_Name, self.AccountModel, "");
            self.setControlValue(self.ref_Username, self.AccountModel, "");
            self.setControlValue(self.ref_Password, self.AccountModel, "");
            self.setControlValue(self.ref_Url, self.AccountModel, "");
            self.setControlValue(self.ref_Comment, self.AccountModel, "");
            if (result.IsSuccess) {
                self.fillGrid(self);
            }
            else {
                alert(result.Message);
            }
        });
    }

    setControlValue = (ctrl, model, value) => {
        if (value != null) {
            ctrl.current.value = value.trim();
            model[ctrl.current.name] = value.trim();
        }
    }

    fillGrid = (self, searchByNameFilter) => {

        self.actSvc.GetAccountDatabyLoginId({ LoginId: localStorage.getItem("LoginId"), Token: localStorage.getItem("Token"), SearchByName : searchByNameFilter },
            function (result) {
                var clients = result.JsonObject.Data;
                $("#jsGrid").jsGrid({
                    width: "100%",
                    height: "705px",
                    pageSize: 17,
                    sorting: true,
                    paging: true,
                    autoload: true,
                    controller: {
                        loadData: function () {
                            return clients;
                        }
                    },
                    rowClick: function (args) {
                        self.setControlValue(self.ref_Name, self.AccountModel, args.item.Name);
                        self.setControlValue(self.ref_Username, self.AccountModel, args.item.Username);
                        self.setControlValue(self.ref_Password, self.AccountModel, args.item.Password);
                        self.setControlValue(self.ref_Url, self.AccountModel, args.item.Url);
                        self.setControlValue(self.ref_Comment, self.AccountModel, args.item.Comment);
                    },
                    fields: [
                        { name: "Name", width: 150, filtering: true },
                        {
                            name: "Url",
                            itemTemplate: function (value) {
                                return $("<a>").attr("href", "#").attr("onclick", "window.open('" + value + "');").text("Link");
                            },
                            type: "text", width: 150, validate: "required"
                        },
                        { name: "Username", type: "text", width: 150, validate: "required" },
                        {
                            name: "Password",
                            itemTemplate: function (value) {
                                return "🔒 * * * *";
                            },
                            type: "text", width: 150, validate: "required"
                        },
                        { name: "Comment", type: "text", width: 150, validate: "required" },
                        //{ type: "control" }
                    ]
                });
            });
    }
}

ReactDOM.render(<AccountPanel />, AccountContainer);