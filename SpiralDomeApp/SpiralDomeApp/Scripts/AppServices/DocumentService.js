class DocumentService {

    AddDocuments = (loginObj, callback) => {

        $.post("../Dashboard/AddDocuments", loginObj, function (result) {
            callback(result);
        });

    }

    GetDocumentsByLoginId = (loginObj, callback) => {

        $.post("../Dashboard/GetDocumentsByLoginId", loginObj, function (result) {
            callback(result);
        });

    }

}