class LoginService {

    InsertLogin = (loginObj, callback) => {

        $.post("../Home/InsertLogin", loginObj, function(result) {
            callback(result);
        });

    }

    IsValidLogin = (loginObj, callback) => {

        $.post("../Home/IsValidLogin", loginObj, function (result) {
            callback(result);
        });
    }
}