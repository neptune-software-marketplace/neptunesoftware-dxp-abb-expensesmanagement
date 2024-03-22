App.setBusy(true);
var jsondata = modelMultiModel_Json_Data.getData();
var data = modelSimpleFormView.getData();
var visible = PanelCurrency.getVisible();
var isNONEUR;
if (visible == true) {
    isNONEUR = true;
}
if (visible == false) {
    ///that means that its already EUR
    isNONEUR = false;
}
var totalPrice = TextTotalPrice.getText();
var addedPrice = InputNewCurr.getValue();
let value1 = totalPrice;
let value2 = addedPrice;
let number1 = parseEuropeanNumber(value1);
let number2 = parseEuropeanNumber(value2);
let sum = number1 + number2;
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
var base64;
var imageSRC = Image.getSrc();
// var pdfSRC = PDFViewer1.getSource();

// if (imageSRC == "") {
//     base64 = pdfSRC;
// }
// if (pdfSRC == "") {
//     base64 = imageSRC;
// }

var options = {
    data: {
        base64: imageSRC,
        Uniqe_id: TextID.getText(),
        comments: inSimpleFormcomments.getValue(),
        InvoiceTotal: "",
        jsonData: jsondata,
        OCR_receiptCurr: SelectCurr1.getValue(),
        curr: "EUR",
        receipt_price: inSimpleFormInvoiceDetailTotal.getValue(),
        EUR_price: InputNewCurr.getValue(),
        isNONEUR: isNONEUR,
    },
};
apiRestAPIReceiptPOST(options);
