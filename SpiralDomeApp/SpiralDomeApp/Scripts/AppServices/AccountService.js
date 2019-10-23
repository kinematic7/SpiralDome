class AccountService {

    GetAccountDatabyLoginId = (loginObj, callback) => {

        $.post("../Dashboard/GetAccountDatabyLoginId", loginObj, function (result) {
            callback(result);
        });

    }

    InsertNewAccount = (accountObj, callback) => {
        accountObj.LoginId = localStorage.getItem("LoginId");
        accountObj.Token = localStorage.getItem("Token");
        $.post("../Dashboard/InsertNewAccount", accountObj, function (result) {
            callback(result);
        });

    }
}