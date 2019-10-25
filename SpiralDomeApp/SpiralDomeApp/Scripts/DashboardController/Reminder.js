var ReminderPanelContainer = document.getElementById("ReminderPanel");

class ReminderPanel extends React.Component {

    constructor(props) {
        super(props);
        this.ref_startdate = React.createRef();
        this.ref_enddate = React.createRef();
        this.ReminderObject = { Name: "", StartDate: null, EndDate: null, Group: null, Comment: null };
    }

    render() {

        var self = this;

        $(document).ready(function () {
            self.setDatePicker();
        });

        return (
            <React.Fragment>
                <TopMenu ParentControl={this} />
                <br/>
                <div className="form-inline">
                    <input type="text" className="form-control" placeholder="Name" />
                    &nbsp;
                    <input type="text" ref={this.ref_startdate} className="form-control" placeholder="Start Date" />
                    &nbsp;
                    <input type="text" ref={this.ref_enddate} className="form-control" placeholder="Start Date" />
                    &nbsp;
                    <input type="text" className="form-control" placeholder="Group" />
                    &nbsp;
                    <input type="text" className="form-control" placeholder="Comment" />
                    &nbsp;
                    <button className='btn btn-sm btn-primary'>Update</button>
                    &nbsp;
                    <button className='btn btn-sm btn-danger'>Delete</button>
                </div>
            </React.Fragment>
        );
    }

    searchByName = (name) => {
        alert(this.txtDateTimePicker.current.value);
    }

    setDatePicker = () => {
        $(this.ref_startdate.current).datepicker();
        $(this.ref_enddate.current).datepicker();
    }
}

ReactDOM.render(<ReminderPanel />, ReminderPanelContainer);