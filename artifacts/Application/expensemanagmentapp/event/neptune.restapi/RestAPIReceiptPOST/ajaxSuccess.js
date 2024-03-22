// alert("saved");
var uniqe_id = TextID.getText();
var options = {
    parameters: {
        "where": JSON.stringify({"Uniqe_id" : uniqe_id})
    }
};

apiRestAPIReceiptGet(options);

IconTabBar.setVisible(false);
HBoxAddButton.setVisible(false);
HBoxImage.setVisible(false);