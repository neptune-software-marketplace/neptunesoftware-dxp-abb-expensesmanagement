sap.m.MessageToast.show("Saved");
var username = AppCache.userInfo.username;
var options = {
    parameters: {
        where: JSON.stringify({ createdBy: username }),
    },
};
apiRestAPIGetExpenses(options);
sap.ui.core.BusyIndicator.hide();