const pdf = req.body.pdfFile;
const parser = req.body.parser;
const BlobServiceClient = modules.blob.BlobServiceClient;
const StorageSharedKeyCredential = modules.blob.StorageSharedKeyCredential;
const AzureKeyCredential = modules.invoiceparser.AzureKeyCredential;
const DocumentAnalysisClient = modules.invoiceparser.DocumentAnalysisClient;
const endpoint = "";
const ACCOUNT_NAME = "parseinvoice";
const SHARED_KEY = "";
const PARSER_KEY = "";
const CONTAINER_NAME = "invoicestore";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const sharedKeyCredential = new StorageSharedKeyCredential(ACCOUNT_NAME, SHARED_KEY);

let matchesBlobPdf = pdf.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
let pdfBuffer = new Buffer.from(matchesBlobPdf[2], 'base64');

const FILENAME = `invoice.${matchesBlobPdf[1].split("/")[1]}`;

const blobServiceClient = new BlobServiceClient(
    "https://" + ACCOUNT_NAME + ".blob.core.windows.net",
    sharedKeyCredential
);

const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

const blockBlobClient = containerClient.getBlockBlobClient(FILENAME);

const uploadBlobResponse = await blockBlobClient.upload(pdfBuffer, pdfBuffer.length);

var pdfURL = "https://" + ACCOUNT_NAME + ".blob.core.windows.net/" + CONTAINER_NAME + "/" + FILENAME;

const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(PARSER_KEY));
const poller = await client.beginAnalyzeDocumentFromUrl(parser, pdfURL);

const { documents, keyValuePairs, tables } = await poller.pollUntilDone();

if (documents && documents.length > 0) {
    var invoice = documents[0].fields;

    if (!invoice || invoice.length <= 0) {
        result.data = { status: 500, statusText: "Could not extract any text from the document !" };
    } else {
        var retHeader = {};
        Object.keys(invoice).forEach(key => { if (key !== 'Items') retHeader[key] = invoice[key].content ? invoice[key].content : invoice[key].value ? invoice[key].value : invoice[key].values[0].content });
        var retItems = [];
        for (const {
            properties: item
        } of invoice.Items?.values ?? []) {
            var retItemObj = {};
            Object.keys(item).forEach(key => retItemObj[key] = item[key].content);
            retItems.push(retItemObj);
        }
        result.data = { header: retHeader, items: [retItems] };
    }

} else if (keyValuePairs && keyValuePairs.length > 0) {
    var invoice = keyValuePairs;

    if (!invoice || invoice.length <= 0) {
        result.data = { status: 500, statusText: "Could not extract any text from the document !" };
    } else {
        var retHeader = {};
        for (const { key, value } of keyValuePairs) {
            var keyContent = key.content.trim();
            var keyVal = (keyContent[keyContent.length - 1]) === ":"
                ? keyContent.slice(0, keyContent.length - 1)
                : keyContent;
            retHeader[keyVal] = `${(value && value.content) || ""}`;
        }
        var retItemsArr = [];
        for (var k = 0; k < tables.length; k++) {
            var retItems = [];
            for (var rowC = 0; rowC < tables[k].rowCount; rowC++) {
                var headerRow;
                var rowData = tables[k].cells.filter(val => val.rowIndex === rowC);
                var retItemObj = {};
                if (rowC === 0) {
                    headerRow = [];
                    rowData.forEach((rd, i) => {
                        if (rd.kind === "columnHeader") {
                            headerRow.push(rd.content);
                        } else {
                            headerRow.push(`Column-${i + 1}`);
                            retItemObj[`Column-${i + 1}`] = rd.content;
                        }
                    });
                } else {
                    rowData.forEach((rd, i) => {
                        retItemObj[headerRow[i]] = rd.content;
                    });
                }
                if (Object.keys(retItemObj).length > 0) retItems.push(retItemObj);
            }
            retItemsArr.push(retItems);
        }
        result.data = { header: retHeader, items: retItemsArr };
    
    }
} else {
    result.data = { status: 500, statusText: "Could not extract any text from the document !" };
}

complete();