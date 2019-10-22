var AccountContainer = document.getElementById("AccountPanel");

class AccountPanel extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="form-inline">
                    <input type="text" class="form-control" placeholder="Name" />
                    &nbsp;
                    <input type="text" class="form-control" placeholder="Url" />
                    &nbsp;
                    <input type="text" class="form-control" placeholder="LoginId" />
                    &nbsp;
                    <input type="text" class="form-control" placeholder="Password" />
                    &nbsp;
                    <input type="text" class="form-control" placeholder="Comment" />
                    &nbsp;
                    &nbsp;
                    <button class='btn btn-success'>🞦</button>
                    &nbsp;
                    <button class='btn btn-primary'>✏</button>
                    &nbsp;
                    <button class='btn btn-danger'>🗙</button>
                </div>
            </React.Fragment>
            );
    }
}

ReactDOM.render(<AccountPanel />, AccountContainer);