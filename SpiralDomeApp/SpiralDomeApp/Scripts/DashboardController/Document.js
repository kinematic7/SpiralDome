var DocumentContainer = document.getElementById("DocumentPanel");

class DocumentPanel extends React.Component {

    constructor(props) {
        super(props);
        this.documentSvc = new DocumentService();
        this.documentSvc.AddDocuments({
            LoginId: localStorage.getItem("LoginId"), Token: localStorage.getItem("Token")
            }, function(result) {
            });
    }

    render() {
        var self = this;
        $(document).ready(function () {
            if (window.location.href.indexOf('Dashboard/Document') > 0) {
                $("#menuDoc").css("color", "salmon");
            }
            self.fillGrid(self);
        });

        return (
            <React.Fragment>
                <TopMenu ParentControl={this} />

            </React.Fragment>
        );
    }

    fillGrid = (self) 

    searchByName = (searchName) => {
        this.fillGrid(this, searchName);
    }

    fillGrid = (self, searchByNameFilter) => {

        self.documentSvc.GetDocumentsByLoginId({ LoginId: localStorage.getItem("LoginId"), Token: localStorage.getItem("Token"), SearchByName: searchByNameFilter },
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
                        {
                            name: "ImageBase64", title: "Image", width: 150, filtering: false, itemTemplate: function (value) {
                                var imgId = Date.now();

                                return $("<div>")
                                    .append("<a onclick='$(\"#" + imgId + "\").dialog({ width:\"auto\", height:\"auto\", title: \"Image\" });'>Show</a>")
                                    .append($("<div hidden>").attr("id", imgId).append($("<img>").attr("src", "data:image/JPG;base64," + value)));
                         }
                        },
                    ]
                });
            });
    }

}

ReactDOM.render(<DocumentPanel />, DocumentContainer);