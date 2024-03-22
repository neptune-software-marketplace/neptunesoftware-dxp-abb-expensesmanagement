function buildHeaderforDetails(json) {
    SimpleFormReceiptDetail.removeAllContent();
    var headerKeys = Object.keys(json);
    IconTabFilterHeader1.setCount(headerKeys.length);
    headerKeys.forEach((propName, i) => {
        var inputValue = json[propName];
        var lineBreaks = (inputValue.match(/\n/g) || []).length > 0;
        var labelText = propName.replaceAll("/", "_");

        // Create a label for the property name
        var propLabel = new sap.m.Label({
            text: propName,
            labelFor: `Input${i + 10}`
        });

        // Determine if we should use Input or TextArea based on the presence of line breaks
        var propInput;
        if (lineBreaks) {
            propInput = new sap.m.TextArea(`Input${i + 10}`, {
                value: `{/${labelText}}`,
                editable: true,
                rows: 3,
                width: "100%", // Set width to 100% to use full container width
                growing: true
            });
        } else {
            propInput = new sap.m.Input(`Input${i + 10}`, {
                value: `{/${labelText}}`,
                editable: true,
                width: "100%" // Set width to 100% to use full container width
            });
        }

        // Add the label and input/textarea to the form
        SimpleFormReceiptDetail.addContent(propLabel);
        SimpleFormReceiptDetail.addContent(propInput);
    });

    modelSimpleFormReceiptDetail.setData(json);
    modelSimpleFormReceiptDetail.refresh();
}

function buildTableforDetails(tabData, num) {
    if (tabData.length > 0) {
        var tableHeader = tabData[0];
        var parser = Select.getSelectedKey();
        var tabText;
        if (parser === "prebuilt-invoice" || parser === "prebuilt-receipt") tabText = "Items";
        else tabText = `Purchase Details`;
        var IconTabFilterItems = new sap.m.IconTabFilter(`IconTabFilterItems-${num}`, {
            text: `${tabText}`,
            key: "items",
            icon: "sap-icon://activity-items",
        });
        IconTabBar1.addItem(IconTabFilterItems);
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
        TableData.setHeaderText("Item Details");
        IconTabFilterItems.setCount(tabData.length);
        modelTableData.setData(tabData);
        modelTableData.refresh();
        // debugger
        console.log(modelTableData.getData());
    }
}


function buildItemsforDetail(tabData) {
    if (tabData.length > 0) {
        tabData.forEach((data, i) => buildTableforDetails(data, i));
    }
}