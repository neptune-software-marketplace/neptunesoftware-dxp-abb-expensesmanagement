sap.ui.getCore().attachInit(function (data) {
    oHTMLObjectCameraUpload.setContent(
        '<input type="file" accept="image/*" id="file-input"  style="display:none">'
    );
});

setTimeout(function () {
    // debugger;
    modeloModelArrayImageStorage.setData([]);
    // const fileInput = document.getElementById("file-input");
    const fileInput = oFlexBoxCameraUpload.getDomRef();
    fileInput.addEventListener("change", (e) => handleFileSelect(e.target.files[0]));
}, 500);

// oPage.setBusy(true);
// apiRestAPIGetNews();

function generateRandomID() {
    return Math.random().toString(36).substr(2, 9);
}
var tempData = [];
var currentData = [];
function handleFileSelect(f) {
    // ButtonGetHTML.firePress();
    var reader = new FileReader();
    reader.onload = (function (theFile) {
        return function (e) {
            var binaryData = e.target.result;
            // Converting Binary Data to base 64
            var base64String = window.btoa(binaryData);

            var fullBase64picture = "data:image/png;base64," + base64String;
            // Image.setSrc(fullBase64picture);
            // var uniqueID = generateRandomID();

            // // currentData = modelListRecipes.getData();
            // var imageToStore = {
            //     Uniqe_id: uniqueID,
            //     base64: fullBase64picture,
            //     comments: "",
            // };
// debugger;
            var uniqe_id = TextID.getText();

            // if (uniqe_id != "") {
                var options = {
                    data: {
                        base64: fullBase64picture,
                        Uniqe_id: uniqe_id,
                        comments: "",
                    },
                };
                apiRestAPIReceiptPOST(options);
            // // }

            // currentData.push(imageToStore);
            // modelModelArrayNewFiles.setData(currentData);
            // modelListRecipes.setData(currentData);

            // tempData.push(imageToStore);
            // modeloModelArrayImageStorage.setData(currentImages);
            // modeloCarousel.setData(currentData);
            // modelModelArrayTemp.setData(tempData);
            // ButtonNext.firePress();
            // setTimeout(next, 3000);
            // if (currentData.length > 0) {
            //     oButtonDeletePicture.setVisible(true);
            // } else {
            //     oButtonDeletePicture.setVisible(false);
            // }

            // oCarousel.next();
        };
    })(f);
    reader.readAsBinaryString(f);

    // setTimeout(function () {
    //     oCarousel.next();
    // }, 500);
}
