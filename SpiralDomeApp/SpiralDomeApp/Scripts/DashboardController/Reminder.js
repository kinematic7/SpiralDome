var ReminderPanelContainer = document.getElementById("ReminderPanel");

class ReminderPanel extends React.Component {

    constructor(props) {
        super(props);
        this.ref_startdate = React.createRef();
        this.ref_enddate = React.createRef();
        this.ReminderObject = { Name: "", StartDate: null, EndDate: null, Group: null, Comment: null };
        this.reminderSvc = new ReminderService();
    }

    render() {

        var self = this;

        $(document).ready(function () {
            self.setDatePicker();
            if (window.location.href.indexOf('Dashboard/Reminder') > 0) {
                $("#menuReminder").css("color", "salmon");
            }
        });

       

        return (
            <React.Fragment>
                <TopMenu ParentControl={this} />
                <br/>
                <div className="form-inline">
                    <input name="Name" onChange={this.bind} type="text" className="form-control" placeholder="Name" />
                    &nbsp;
                    <input name="StartDate" onChange={this.bind} type="text" ref={this.ref_startdate} className="form-control" placeholder="Start Date" />
                    &nbsp;
                    <input name="EndDate" onChange={this.bind} type="text" ref={this.ref_enddate} className="form-control" placeholder="End Date" />
                    &nbsp;
                    <input name="Group" onChange={this.bind} type="text" className="form-control" placeholder="Group" />
                    &nbsp;
                    <input name="Commnent" onChange={this.bind} type="text" className="form-control" placeholder="Comment" />
                    &nbsp;
                    <button onClick={this.updateEventClick} className='btn btn-sm btn-primary' title='add or update'>Update</button>
                    &nbsp;
                    <button className='btn btn-sm btn-danger' title='delete'>Delete</button>
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

    searchByName = (name) => {
        alert(this.txtDateTimePicker.current.value);
    }

    updateEventClick = (e) => {
        var self = this;
        this.reminderSvc.UpdateReminder(this.ReminderObject, function (result) {
            if (result.IsSuccess) {
                //self.fillGrid(self);
            }
            else {
                alert(result.Message);
            }
        }
        );
    }


    setControlValue = (ctrl, model, value) => {
        if (value != null) {
            ctrl.current.value = value.trim();
            model[ctrl.current.name] = value.trim();
        }
    }

}

ReactDOM.render(<ReminderPanel />, ReminderPanelContainer);