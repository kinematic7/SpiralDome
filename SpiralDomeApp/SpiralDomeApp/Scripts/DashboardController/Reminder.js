var ReminderPanelContainer = document.getElementById("ReminderPanel");

class ReminderPanel extends React.Component {

    constructor(props) {
        super(props);
        this.today = new Date();
        this.sdate = this.today.getMonth() + "/" + this.today.getDate() + "/" + this.today.getFullYear();
        this.edate = this.sdate;
        this.ref_name = React.createRef();
        this.ref_startdate = React.createRef();
        this.ref_enddate = React.createRef();
        this.ref_group = React.createRef();
        this.ref_comment = React.createRef();
        this.ReminderObject = { Name: "", StartDate: this.sdate, EndDate: this.edate, Group: "", Comment: " " };
        this.reminderSvc = new ReminderService();
    }

    render() {

        var self = this;

        $(document).ready(function () {
            self.setDatePicker();
            if (window.location.href.indexOf('Dashboard/Reminder') > 0) {
                $("#menuReminder").css("color", "salmon");
                self.fillGrid(self);
            }
        });

       

        return (
            <React.Fragment>
                <TopMenu ParentControl={this} />
                <br/>
                <div className="form-inline">
                    <input name="Name" ref={this.ref_name} onChange={this.bind} type="text" className="form-control" placeholder="Name" />
                    &nbsp;
                    <input name="StartDate" value={this.ReminderObject.StartDate} onChange={this.bind} type="text" ref={this.ref_startdate} className="form-control" placeholder="Start Date" />
                    &nbsp;
                    <input name="EndDate" value={this.ReminderObject.EndDate} onChange={this.bind} type="text" ref={this.ref_enddate} className="form-control" placeholder="End Date" />
                    &nbsp;
                    <input name="Group" ref={this.ref_group} onChange={this.bind} type="text" className="form-control" placeholder="Group" />
                    &nbsp;
                    <input name="Comment" ref={this.ref_comment} onChange={this.bind} type="text" className="form-control" placeholder="Comment" />
                    &nbsp;
                    <button onClick={this.updateEventClick} className='btn btn-sm btn-primary' title='add or update'>Update</button>
                    &nbsp;
                    <button onClick={this.deleteEventClick} className='btn btn-sm btn-danger' title='delete'>Delete</button>
                </div>
            </React.Fragment>
        );
    }

    setDatePicker = () => {
        var self = this;
        $(this.ref_startdate.current).datepicker({
            onSelect: function (dateText, inst) {
                var date = $(this).val();
                self.ReminderObject["StartDate"] = date;
            }
        });

        $(this.ref_enddate.current).datepicker({
            onSelect: function (dateText, inst) {
                var date = $(this).val();
                self.ReminderObject["EndDate"] = date;
            }
        });
    }

    bind = (e) => {
        this.ReminderObject[e.target.name] = e.target.value;
        this.setState({ [e.target.name]: e.target.value });
    }

    searchByName = (searchValue) => {
        this.fillGrid(this, searchValue);
    }

    updateEventClick = (e) => {
        var self = this;
        this.reminderSvc.UpdateReminder(this.ReminderObject, function (result) {
            if (result.IsSuccess) {
                self.fillGrid(self);
                self.setControlValue(self.ref_name, self.ReminderObject, "");
                self.setControlValue(self.ref_startdate, self.ReminderObject, "");
                self.setControlValue(self.ref_enddate, self.ReminderObject, "");
                self.setControlValue(self.ref_group, self.ReminderObject, "");
                self.setControlValue(self.ref_comment, self.ReminderObject, "");
            }
            else {
                alert(result.Message);
            }
        }
        );
    }

    deleteEventClick = (e) => {
        var self = this;
        this.reminderSvc.DeleteReminder(this.ReminderObject, function (result) {
            if (result.IsSuccess) {
                self.fillGrid(self);
                self.setControlValue(self.ref_name, self.ReminderObject, "");
                self.setControlValue(self.ref_startdate, self.ReminderObject, "");
                self.setControlValue(self.ref_enddate, self.ReminderObject, "");
                self.setControlValue(self.ref_group, self.ReminderObject, "");
                self.setControlValue(self.ref_comment, self.ReminderObject, "");
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

        self.reminderSvc.GetReminderDatabyLoginId({ LoginId: localStorage.getItem("LoginId"), Token: localStorage.getItem("Token"), SearchByName: searchByNameFilter },
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
                        self.setControlValue(self.ref_name, self.ReminderObject, args.item.Name);
                        self.setControlValue(self.ref_startdate, self.ReminderObject, args.item.StartDateGUI);
                        self.setControlValue(self.ref_enddate, self.ReminderObject, args.item.EndDateGUI);
                        self.setControlValue(self.ref_group, self.ReminderObject, args.item.Group);
                        self.setControlValue(self.ref_comment, self.ReminderObject, args.item.Comment);
                    },
                    fields: [
                        { name: "Name", width: 150, filtering: true },
                        { name: "StartDateGUI", title: "Start Date", type: "date", width: 150, filtering: true },
                        { name: "EndDateGUI", title: "End Date", type: "date", width: 150, filtering: true },
                        { name: "Group", width: 150, filtering: true },
                        { name: "Comment", type: "text", width: 150, validate: "required" }
                    ]
                });
            });
    }
}

ReactDOM.render(<ReminderPanel />, ReminderPanelContainer);