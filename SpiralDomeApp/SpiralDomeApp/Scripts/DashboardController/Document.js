var DocumentContainer = document.getElementById("DocumentPanel");

class DocumentPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var self = this;
        $(document).ready(function () {
            if (window.location.href.indexOf('Dashboard/Document') > 0) {
                $("#menuDoc").css("color", "salmon");
            }
        });

        return (
            <React.Fragment>
                <TopMenu ParentControl={this} />
            </React.Fragment>
        );
    }

    searchByName = (searchName) => {

    }
    
}

ReactDOM.render(<DocumentPanel />, DocumentContainer);