navigateToDetail();
sap.ui.core.BusyIndicator.show(0);
IconTabBar.setVisible(false);
HBoxAddButton.setVisible(false);
const context = oEvent.oSource.getBindingContext();
const data = context.getObject();
const total_price = context.getProperty("totalPrice");
TextTotalPrice.setText(total_price);
oDatePickerTDDateFrom.setValue(formatDateTimeToLocale(data.From));
oDatePickerTDDateTo.setValue(formatDateTimeToLocale(data.To));
oInputTDLocation.setValue(data.Location);
oInputTDReason.setValue(data.Reason);
InputCountry.setValue(data.Country);
TextAreaComments.setValue(data.Comments);
TextID.setText(data.Uniqe_id);
TextStatus.setText(data.status);
ButtonDelete.setVisible(true);
ButtonSendForApproval.setVisible(false);
HBoxImage.setVisible(false);

if (data.status == "Draft") {
    TextAreaComments.setEditable(true);
    ButtonOCR.setVisible(true);
    ButtonSendForApproval.setVisible(true);
    oDatePickerTDDateFrom.setEditable(true);
    oDatePickerTDDateTo.setEditable(true);
    oInputTDLocation.setEditable(true);
    oInputTDReason.setEditable(true);
    InputCountry.setEditable(true);
    ButtonAdd.setEnabled(true);
}
if (data.status == "Approved") {
    TextAreaComments.setEditable(false);
    ButtonOCR.setVisible(false);
    ButtonDelete.setVisible(false);
    oDatePickerTDDateFrom.setEditable(false);
    oDatePickerTDDateTo.setEditable(false);
    oInputTDLocation.setEditable(false);
    oInputTDReason.setEditable(false);
    InputCountry.setEditable(false);
    ButtonAdd.setEnabled(false);
}
if (data.status == "Rejected") {
    TextAreaComments.setEditable(false);
    ButtonOCR.setVisible(false);
    ButtonDelete.setVisible(false);
    oDatePickerTDDateFrom.setEditable(false);
    oDatePickerTDDateTo.setEditable(false);
    oInputTDLocation.setEditable(false);
    oInputTDReason.setEditable(false);
    InputCountry.setEditable(false);
    ButtonAdd.setEnabled(false);
}
if (data.status == "Sent") {
    TextAreaComments.setEditable(false);
    ButtonOCR.setVisible(false);
    ButtonDelete.setVisible(false);
    oDatePickerTDDateFrom.setEditable(false);
    oDatePickerTDDateTo.setEditable(false);
    oInputTDLocation.setEditable(false);
    oInputTDReason.setEditable(false);
    InputCountry.setEditable(false);
    ButtonAdd.setEnabled(false);
}

var options = {
    parameters: {
        where: JSON.stringify({ Uniqe_id: data.Uniqe_id }),
    },
};
apiRestAPIReceiptGet(options);
