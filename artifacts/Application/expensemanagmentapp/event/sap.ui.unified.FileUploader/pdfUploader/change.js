var file = pdfUploader.oFileUpload.files[0];
if (file) {
    var fileReader = new FileReader();
    fileName = file.name;
    var fileExtn = fileName.split(".")[1];
    fileReader.onload = function (fileLoadedEvent) {
        fileContentBase64 = fileLoadedEvent.target.result;
        if (fileExtn === "pdf") {
            PDFViewer.setVisible(true);
            PDFViewer.setSource(pdfToBlob(fileContentBase64));
            PDFViewer1.setVisible(true);
            PDFViewer1.setSource(pdfToBlob(fileContentBase64));
            Panel.setVisible(true);
            Image1.setVisible(false);
            Image.setSrc(fileContentBase64);
            Image.removeStyleClass("ReceiptPreview");
            Image.addStyleClass("zeroHeight");
        } else {
            Image.setVisible(true);
            Panel.setVisible(true);
            Image.removeStyleClass("zeroHeight");
            Image.addStyleClass("ReceiptPreview");
            Image1.setSrc(fileContentBase64);
            Image.setSrc(fileContentBase64);
            Image1.setVisible(true);
            HBoxImage.setVisible(true);
            PDFViewer.setVisible(false);
            PDFViewer1.setVisible(false);
            PDFViewer1.setSource();
        }
    };

    fileReader.readAsDataURL(file);
}else{
    PageViewResults.fireNavButtonPress();
}
