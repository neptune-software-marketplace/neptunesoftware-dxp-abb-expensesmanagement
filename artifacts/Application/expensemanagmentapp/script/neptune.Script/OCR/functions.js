function pdfToBlob(base64EncodedPDF) {
    var decodedPdfContent = atob(base64EncodedPDF.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2]);
    var byteArray = new Uint8Array(decodedPdfContent.length);
    for (var i = 0; i < decodedPdfContent.length; i++) {
        byteArray[i] = decodedPdfContent.charCodeAt(i);
    }
    var blob = new Blob([byteArray.buffer], { type: "application/pdf" });
    return URL.createObjectURL(blob);
}

function convertInvoiceCurrency(invoiceTotal, fromCurrency, toCurrency) {
    const apiKey = "";
    function getFirstWord(string) {
        return string.split(" ")[0];
    }

    function parseToFloat(strNum) {
        let thousandSeparator, decimalSeparator;
        if (strNum.indexOf(",") < strNum.indexOf(".")) {
            thousandSeparator = ",";
            decimalSeparator = ".";
        } else {
            thousandSeparator = ".";
            decimalSeparator = ",";
        }
        strNum = strNum.replace(new RegExp(`\\${thousandSeparator}`, "g"), "");
        strNum = strNum.replace(decimalSeparator, ".");
        return parseFloat(strNum);
    }

    function removeNonNumericCharacters(str) {
        return str.replace(/[^\d.,]/g, "");
    }

    function transactionResponse(response) {
        const firstCurrencyKey = Object.keys(response.result)[0];
        const firstCurrencyValue = response.result[firstCurrencyKey];
        console.log(firstCurrencyValue);
        InputNewCurr.setValue(firstCurrencyValue);
    }

    const money = getFirstWord(invoiceTotal);
    const numericAmountString = removeNonNumericCharacters(money);
    const numericAmount = parseToFloat(numericAmountString);

    const convertCurrency = (from, to, amount) => {
        const url = `https://api.fastforex.io/convert?from=${from}&to=${to}&amount=${amount}&api_key=${apiKey}`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((response) => transactionResponse(response))
            .catch((err) => console.error(err));
    };

    convertCurrency(fromCurrency, toCurrency, numericAmount);
}

function buildHeader(json) {
    SimpleFormView.removeAllContent();
    var headerKeys = Object.keys(json);
    IconTabFilterHeader.setCount(headerKeys.length);
    headerKeys.forEach((propName, i) => {
        var inputValue = json[propName];
        var lineBreaks = (inputValue.match(/\n/g) || []).length > 0;
        var labelText = propName.replaceAll("/", "_");

        // Create a label for the property name
        var propLabel = new sap.m.Label({
            text: propName,
            labelFor: `Input${i + 10}`,
        });

        // Determine if we should use Input or TextArea based on the presence of line breaks
        var propInput;
        if (lineBreaks) {
            propInput = new sap.m.TextArea(`Input${i + 10}`, {
                value: `{/${labelText}}`,
                editable: true,
                rows: 3,
                width: "100%", // Set width to 100% to use full container width
                growing: true,
            });
        } else {
            propInput = new sap.m.Input(`Input${i + 10}`, {
                value: `{/${labelText}}`,
                editable: true,
                width: "100%", // Set width to 100% to use full container width
            });
        }

        // Add the label and input/textarea to the form
        SimpleFormView.addContent(propLabel);
        SimpleFormView.addContent(propInput);
    });
    var data = SimpleFormView.getContent();
    modelSimpleFormView.setData(json);
    modelSimpleFormView.refresh();
}

function buildTable(tabData, num) {
    if (tabData.length > 0) {
        var tableHeader = tabData[0];
        var parser = Select.getSelectedKey();
        var tabText;
        if (parser === "prebuilt-invoice" || parser === "prebuilt-receipt") tabText = "Items";
        else tabText = `Table ${num + 1}`;
        var IconTabFilterItems = new sap.m.IconTabFilter(`IconTabFilterItems-${num}`, {
            text: `${tabText}`,
            key: "items",
            icon: "sap-icon://activity-items",
        });
        IconTabBar.addItem(IconTabFilterItems);
        var TableData = new sap.m.Table(`TableData-${num}`, {});
        IconTabFilterItems.addContent(TableData);
        var columnListTableData = new sap.m.ColumnListItem(`columnListTableData-${num}`, {});
        var modelTableData = new sap.ui.model.json.JSONModel();
        TableData.setModel(modelTableData);
        TableData.bindAggregation("items", {
            path: "/",
            template: columnListTableData,
            templateShareable: false,
        });

        var headerKeys = Object.keys(tableHeader);
        headerKeys.forEach((propName, i) => {
            var colTableData = new sap.m.Column(`colTableData-${num}-${i}`, {});
            var lblTableData = new sap.m.Text(`lblTableData-${num}-${i}`, {
                text: propName,
            });
            TableData.addColumn(colTableData);
            colTableData.setHeader(lblTableData);

            var txtTableData = new sap.m.Text(`txtTableData-${num}-${i}`, {
                text: "{" + propName + "}",
            });
            columnListTableData.addCell(txtTableData);
        });
        TableData.setHeaderText("Rows: " + tabData.length);
        IconTabFilterItems.setCount(tabData.length);
        modelTableData.setData(tabData);
        modelTableData.refresh();
        var tableReceipts = modelTableData.getData();
    }
}

function buildItems(tabData) {
    if (tabData.length > 0) {
        tabData.forEach((data, i) => buildTable(data, i));
    }
}

function removeTabFilters() {
    var tabItems = IconTabBar.getItems();
    tabItems.forEach((item, i) => {
        if (item.getId().includes("IconTabFilterItems")) IconTabBar.removeItem(item);
    });
    var tabItems1 = IconTabBar1.getItems();
    tabItems1.forEach((item, i) => {
        if (item.getId().includes("IconTabFilterItems")) IconTabBar1.removeItem(item);
    });
}

function removeTabFiltersForDetails() {
    var tabItems1 = IconTabBar1.getItems();
    tabItems1.forEach((item, i) => {
        if (item.getId().includes("IconTabFilterItems")) IconTabBar1.removeItem(item);
    });
}
function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function parseEuropeanNumber(numberString) {
    if (numberString.trim() === "") {
        return 0;
    }

    let hasThousandSeparator = (numberString.match(/\./g) || []).length > 1 || (numberString.includes('.') && numberString.includes(','));
    let hasDecimalSeparator = numberString.includes(',');

    let withoutThousandSeparators = numberString;
    let normalized = numberString;

    if (hasThousandSeparator && hasDecimalSeparator) {
        withoutThousandSeparators = numberString.replace(/\./g, ''); 
        normalized = withoutThousandSeparators.replace(/,/, '.'); 
    } else if (!hasThousandSeparator && hasDecimalSeparator) {
        normalized = numberString.replace(/,/, '.');
    }

    return parseFloat(normalized);
}
