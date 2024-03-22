var statusForInvoice = TextStatus.getText();
if (statusForInvoice != "Draft") {
    sap.m.MessageToast.show("You can not delete sent files!!");
    return;
}
sap.ui.core.BusyIndicator.show(0);
const context = oEvent.oSource.getBindingContext();
const eur_price = context.getProperty("EUR_price");

var totalPrice = TextTotalPrice.getText();
var addedPrice = eur_price;

let value1 = totalPrice;
let value2 = addedPrice;
let number1 = parseEuropeanNumber(value1);
let number2 = parseEuropeanNumber(value2);
let sum = number1 - number2;
sum = parseFloat(sum).toFixed(2);
TextTotalPrice.setText(sum);

var uniqe_id = TextID.getText();
var options = {
    parameters: {
        where: JSON.stringify({ Uniqe_id: uniqe_id }),
    },
    data: {
        totalPrice: sum,
    },
};

apiRestAPIUpdateExpense(options);

const value = context.getProperty("id");

var options = {
    parameters: {
        where: JSON.stringify({ id: value }),
    },
};

apiRestAPIReceiptDelete(options);
