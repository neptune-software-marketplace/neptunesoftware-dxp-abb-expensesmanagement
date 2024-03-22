oInputTDReason.setValueState("None");

var id = TextID.getText();
var options = {
    parameters: {
        "where": JSON.stringify({"Uniqe_id" : id})
    },
    data: {
        "Reason": this.getValue(),
    }
};

apiRestAPIPostExpense(options);