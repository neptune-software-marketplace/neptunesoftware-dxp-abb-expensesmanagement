sap.m.MessageToast.show("Refreshed");
var username = AppCache.userInfo.username;
var options = {
    parameters: {
        where: JSON.stringify({ createdBy: username }),
    },
};
apiRestAPIGetExpenses(options) ;