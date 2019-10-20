class LoginService {

    InsertLogin(loginObj, callback) {

        $.post("../Home/InsertLogin", loginObj, function(result) {
            callback(result);
        });

    }
}