var total;
var fromcurr;
var tocurr;
var fromCurrency;
var toCurrency;
var invoiceTotal;

function keepOnlyNumbers(str) {
    return str.replace(/[^0-9.,]/g, "");
}
function extractPriceAndCurrency(data) {
    
    const subtotalMatch = data.Subtotal;
    const totalMatch = data.Total;
    if (totalMatch) {
        let text = totalMatch;
        let ALLresult = text.match(/[£$€R]|USD|EUR|GBP|R/gi);
        if (ALLresult && ALLresult.length > 0) {
            result = ALLresult[0];
        } else {
            result = ALLresult;
        }

        if (result == "£" || result == "GBP") {
            const numbersOnlyString = keepOnlyNumbers(text);
            inSimpleFormInvoiceDetailTotal.setValue(numbersOnlyString);
            SelectCurr1.setValue("GBP");
            total = inSimpleFormInvoiceDetailTotal.getValue();
            fromcurr = SelectCurr1.getValue();
            tocurr = SelectCurr2.getValue();
            fromCurrency = fromcurr;
            toCurrency = tocurr;
            invoiceTotal = total;
            convertInvoiceCurrency(invoiceTotal, fromCurrency, toCurrency);
            PanelCurrency.setVisible(true);
            return;
        }
        if (result == "$" || result == "USD") {
            const numbersOnlyString = keepOnlyNumbers(text);
            inSimpleFormInvoiceDetailTotal.setValue(numbersOnlyString);
            SelectCurr1.setValue("USD");
            total = inSimpleFormInvoiceDetailTotal.getValue();
            fromcurr = SelectCurr1.getValue();
            tocurr = SelectCurr2.getValue();
            fromCurrency = fromcurr;
            toCurrency = tocurr;
            invoiceTotal = total;
            convertInvoiceCurrency(invoiceTotal, fromCurrency, toCurrency);
            PanelCurrency.setVisible(true);
            return;
        }
        if (result == "CAD") {
            const numbersOnlyString = keepOnlyNumbers(text);
            inSimpleFormInvoiceDetailTotal.setValue(numbersOnlyString);
            SelectCurr1.setValue("CAD");
            total = inSimpleFormInvoiceDetailTotal.getValue();
            fromcurr = SelectCurr1.getValue();
            tocurr = SelectCurr2.getValue();
            fromCurrency = fromcurr;
            toCurrency = tocurr;
            invoiceTotal = total;
            convertInvoiceCurrency(invoiceTotal, fromCurrency, toCurrency);
            PanelCurrency.setVisible(true);
            return;
        }
        if (result == "€" || result == "EUR") {
            const numbersOnlyString = keepOnlyNumbers(text);
            InputNewCurr.setValue(numbersOnlyString);
            SelectCurr1.setValue("");
            PanelCurrency.setVisible(false);
            return;
        }
        if (result == "R" || result == "ZAR") {
            const numbersOnlyString = keepOnlyNumbers(text);
            inSimpleFormInvoiceDetailTotal.setValue(numbersOnlyString);
            SelectCurr1.setValue("ZAR");
            total = inSimpleFormInvoiceDetailTotal.getValue();
            fromcurr = SelectCurr1.getValue();
            tocurr = SelectCurr2.getValue();
            fromCurrency = fromcurr;
            toCurrency = tocurr;
            invoiceTotal = total;
            convertInvoiceCurrency(invoiceTotal, fromCurrency, toCurrency);
            PanelCurrency.setVisible(true);
            return;
        }
        if (result == null) {
            const numbersOnlyString = keepOnlyNumbers(text);
            inSimpleFormInvoiceDetailTotal.setValue(numbersOnlyString);
            SelectCurr1.setValue("");
            sap.m.MessageToast.show("Currency not found please enter currency!!!!");
            PanelCurrency.setVisible(true);
            return;
        }
        sap.m.MessageToast.show("not supported currency please check the total details");
        PanelCurrency.setVisible(true);
    } else {
        sap.m.MessageToast.show("Total not found please enter manually!!!!");
        PanelCurrency.setVisible(true);
    }
}

sap.ui.core.BusyIndicator.hide();
var response = xhr.responseJSON;
removeTabFilters();
modelMultiModel_Json_Data.setData(response);
if (response && response.header) {
    App.to(PageViewResults);
    buildHeader(response.header);
    buildItems(response.items);
    IconTabBar.setSelectedKey("header");
    IconTabBar.setVisible(true);
    HBoxAddButton.setVisible(true);
    HBoxImage.setVisible(true);
    extractPriceAndCurrency(response.header);
    App.backToPage(oPage);

    sap.m.MessageBox.show(
        "Please check the receipt details first", {
            title: "Information",
            icon: sap.m.MessageBox.Icon.INFORMATION,
            actions: [sap.m.MessageBox.Action.OK],
            onClose: function(oAction) {
            }
        }
);
} else {
    sap.m.MessageToast.show("Could not extract any text from the document !");
}
