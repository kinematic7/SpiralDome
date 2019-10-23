class AccountService {

    GetAccountDatabyLoginId = (loginObj, callback) => {

        $.post("../Dashboard/GetAccountDatabyLoginId", loginObj, function (result) {
            callback(result);
        });

    }

    UpdateAccount = (accountObj, callback) => {
        accountObj.LoginId = localStorage.getItem("LoginId");
        accountObj.Token = localStorage.getItem("Token");
        $.post("../Dashboard/UpdateAccount", accountObj, function (result) {
            callback(result);
        });

    }
}