sap.ui.core.BusyIndicator.show(0);
const context = oEvent.oSource.getBindingContext();
const value = context.getProperty("base64");
var fileType;
function isPDF(url) {
    return url.toLowerCase().startsWith("data:application/pdf");
}

function determineFileType(url) {
    if (isPDF(url)) {
        PDFViewer2.setSource(pdfToBlob(url));
        DialogPDF.open();
        sap.ui.core.BusyIndicator.hide();
    } else {
        LightBoxItem1.setImageSrc(url);
        sap.ui.core.BusyIndicator.hide();
        LightBox1.open();
    }
}
determineFileType(value);
