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
                    <button onClick={this.insertAccountObject} className='btn btn-success'>🞦</button>
                    &nbsp;
                    <button className='btn btn-primary'>✏</button>
                    &nbsp;
                    <button className='btn btn-danger'>🗙</button>
                </div>
            </React.Fragment>
            );
    }

    bind = (e) => {
        this.AccountModel[e.target.name] = e.target.value;
        this.setState({ [e.target.name]: e.target.value });
    }

    insertAccountObject = (e) => {
        var self = this;
        this.actSvc.InsertNewAccount(this.AccountModel, function (result) {
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
        ctrl.current.value = value;
        model[ctrl.current.name] = value;
    }

    fillGrid = (self) => {

        self.actSvc.GetAccountDatabyLoginId({ LoginId: localStorage.getItem("LoginId"), Token: localStorage.getItem("Token") },
            function (result) {
                var clients = result.JsonObject.Data;
                $("#jsGrid").jsGrid({
                    width: "100%",
                    height: "705px",
                    pageSize: 17,
                    //inserting: true,
                    //editing: true,
                    sorting: true,
                    paging: true,

                    autoload: true,
                    controller: {
                        loadData: function () {
                            return clients;
                        }
                    },
                    rowClick: function (args) {
                        $(self.ref_Name.current).val(args.item.Name);
                        $(self.ref_Url.current).val(args.item.Url);
                        $(self.ref_Username.current).val(args.item.Username);
                        $(self.ref_Password.current).val(args.item.Password);
                        $(self.ref_Comment.current).val(args.item.Comment);
                    },
                    fields: [
                        { name: "Name", width: 150, filtering: true },
                        {
                            name: "Url",
                            itemTemplate: function (value) {
                                return $("<a>").attr("href", value).text("Link");
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