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
const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-invoice", pdfURL);

const { keyValuePairs } = await poller.pollUntilDone();

if (!keyValuePairs || keyValuePairs.length <= 0) {
    result.status = 500;
    result.statusText = "No key value pairs were found in the document for extraction !";
} else {
    var retJSON = [];
    for (const { key, value } of keyValuePairs) {
        var keyContent = key.content.trim();
        var keyVal =(keyContent[keyContent.length - 1]) === ":"
                ? keyContent.slice(0, keyContent.length - 1)
                : keyContent;
        retJSON.push({ key: `${keyVal}`, value: `${(value && value.content) || ""}` })
    }
    result.status = 200;
    result.data = retJSON;
}

complete();