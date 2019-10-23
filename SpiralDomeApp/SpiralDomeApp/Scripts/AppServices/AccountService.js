class AccountService {
    GetAccountDatabyLoginId = (loginObj, callback) => {

        $.post("../Dashboard/GetAccountDatabyLoginId", loginObj, function (result) {
            callback(result);
        });

    }
}