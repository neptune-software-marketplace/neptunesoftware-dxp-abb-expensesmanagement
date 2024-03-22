var uniqe_id = TextID.getText();
var options = {
    parameters: {
        "where": JSON.stringify({"Uniqe_id" : uniqe_id})
    }
};
apiRestAPIReceiptGet(options);
sap.m.MessageToast.show("Deleted!!");