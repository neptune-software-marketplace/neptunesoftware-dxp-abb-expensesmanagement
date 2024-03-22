navigateToDetail();
oDatePickerTDDateFrom.setValue();
oDatePickerTDDateTo.setValue();
oInputTDLocation.setValue();
oInputTDReason.setValue();
TextAreaComments.setValue();
InputCountry.setValue();
TextTotalPrice.setText();
ButtonSendForApproval.setVisible(true);
oDatePickerTDDateFrom.setEditable(true);
oDatePickerTDDateTo.setEditable(true);
oInputTDLocation.setEditable(true);
TextAreaComments.setEditable(true);
oInputTDReason.setEditable(true);
InputCountry.setEditable(true);
ButtonAdd.setEnabled(true);
ButtonOCR.setVisible(true);
SimpleFormReceiptDetails.setVisible(true);
TextID.setText();
ButtonDelete.setVisible(false);
ButtonSendForApproval.setVisible(true);
sap.ui.core.BusyIndicator.show(0);
const myUUID = generateUUID();
TextID.setText(myUUID);
var empty = [];
modelListReceipts.setData(empty);
var options = {
    data: {
        "Uniqe_id": myUUID,
        "status": "Draft" ,
    }
};
apiRestAPIPostExpense(options);