oInputTDLocation.setValueState("None");

var id = TextID.getText();
var options = {
    parameters: {
        "where": JSON.stringify({"Uniqe_id" : id})
    },
    data: {
        "Location": this.getValue(),
    }
};

apiRestAPIPostExpense(options);