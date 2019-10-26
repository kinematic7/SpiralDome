class ReminderService {

    GetAccountDatabyLoginId = (loginObj, callback) => {

        $.post("../Dashboard/GetReminderDatabyLoginId", loginObj, function (result) {
            callback(result);
        });

    }

    UpdateReminder = (reminderObj, callback) => {
        reminderObj.LoginId = localStorage.getItem("LoginId");
        reminderObj.Token = localStorage.getItem("Token");
        $.post("../Dashboard/UpdateReminder", reminderObj, function (result) {
            callback(result);
        });

    }

    DeleteReminder = (reminderObj, callback) => {
        reminderObj.LoginId = localStorage.getItem("LoginId");
        reminderObj.Token = localStorage.getItem("Token");
        $.post("../Dashboard/DeleteReminder", reminderObj, function (result) {
            callback(result);
        });

    }
}