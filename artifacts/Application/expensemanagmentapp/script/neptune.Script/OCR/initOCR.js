var fileContentBase64;
var fileName;

sap.ui.getCore().attachInit(function(startParams) {
    setTimeout(function() {
        jQuery.sap.addUrlWhitelist("blob");
    }, 200);

});