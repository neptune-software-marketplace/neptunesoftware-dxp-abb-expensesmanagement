var total = inSimpleFormInvoiceDetailTotal.getValue();
var fromcurr = SelectCurr1.getValue();
var tocurr = SelectCurr2.getValue();
const fromCurrency = fromcurr;
const toCurrency = tocurr;
const invoiceTotal = total;
convertInvoiceCurrency(invoiceTotal, fromCurrency, toCurrency);

