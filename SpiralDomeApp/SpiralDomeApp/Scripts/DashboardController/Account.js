﻿var AccountContainer = document.getElementById("AccountPanel");

class AccountPanel extends React.Component {

    render() {
        this.fillGrid();

        return (
            <React.Fragment>
                <div className="form-inline">
                    <input type="text" className="form-control" placeholder="Name" />
                    &nbsp;
                    <input type="text" className="form-control" placeholder="Url" />
                    &nbsp;
                    <input type="text" className="form-control" placeholder="LoginId" />
                    &nbsp;
                    <input type="text" className="form-control" placeholder="Password" />
                    &nbsp;
                    <input type="text" className="form-control" placeholder="Comment" />
                    &nbsp;
                    &nbsp;
                    <button className='btn btn-success'>🞦</button>
                    &nbsp;
                    <button className='btn btn-primary'>✏</button>
                    &nbsp;
                    <button className='btn btn-danger'>🗙</button>
                </div>
            </React.Fragment>
            );
    }

    fillGrid = (e) => {
        var clients = [
            { "Name": "Otto Clay", "Age": 25, "Country": 1, "Address": "Ap #897-1459 Quam Avenue", "Married": false },
            { "Name": "Connor Johnston", "Age": 45, "Country": 2, "Address": "Ap #370-4647 Dis Av.", "Married": true },
            { "Name": "Lacey Hess", "Age": 29, "Country": 3, "Address": "Ap #365-8835 Integer St.", "Married": false },
            { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave", "Married": true },
            { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false }
        ];

        $("#jsGrid").jsGrid({
            width: "100%",
            height: "600px",

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

            fields: [
                {
                    name: "Name",
                    itemTemplate: function (value) {
                        return $("<a>").attr("href", value).text(value);
                    }, width: 150, filtering: true
                },
                { name: "Url", type: "text", width: 150, validate: "required" },
                { name: "LoginId", type: "text", width: 150, validate: "required" },
                { name: "Password", type: "text", width: 150, validate: "required" },
                { name: "Comment", type: "text", width: 150, validate: "required" },
                //{ type: "control" }
            ]
        });
    }
}

ReactDOM.render(<AccountPanel />, AccountContainer);