DialogReceiptDetails.open();
sap.ui.core.BusyIndicator.show(0);
removeTabFiltersForDetails()
const context = oEvent.oSource.getBindingContext();
const value = context.getProperty("Uniqe_id");
const data = context.getObject();
buildHeaderforDetails(data.jsonData.header);
buildItemsforDetail(data.jsonData.items);

var isNONEUR = data.isNONEUR;
if (isNONEUR == true) {
   receipt_Curr_Label.setVisible(true);
   receipt_Curr_Text.setVisible(true);
   curr_converted_label.setVisible(true);
   curr_converted_text.setVisible(true);
   alreadyEUR.setVisible(false);
   alreadyEURText.setVisible(false);
}
if (isNONEUR == false) {
   receipt_Curr_Label.setVisible(false);
   receipt_Curr_Text.setVisible(false);
   curr_converted_label.setVisible(false);
   curr_converted_text.setVisible(false);
   alreadyEUR.setVisible(true);
   alreadyEURText.setVisible(true);
}

IconTabBar1.setSelectedKey("header");
inSimpleFormcomments.setValue(data.comments);
receipt_Curr_Text.setText(data.receipt_price + " " + data.OCR_receiptCurr);
curr_converted_text.setText(data.EUR_price + " " + "EUR");
alreadyEURText.setText(data.EUR_price + " " + "EUR");

sap.ui.core.BusyIndicator.hide();
