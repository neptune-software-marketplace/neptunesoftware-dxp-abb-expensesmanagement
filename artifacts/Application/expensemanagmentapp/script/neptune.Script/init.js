var fileContentBase64;
var fileName;
var isSavedOffline = false;
var iscreated = false;
var sort = true;


function formatDateTimeToLocale(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = {
        year: 'numeric',
        month: 'short', 
        day: '2-digit'  
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}


sap.ui.getCore().attachInit(function (startParams) {
    setTimeout(function () {
        jQuery.sap.addUrlWhitelist("blob");
    }, 200);
});
var username = AppCache.userInfo.username;
var options = {
    parameters: {
        where: JSON.stringify({ createdBy: username }),
    },
};
apiRestAPIGetExpenses(options);




const apiKey = "";
const url = `https://api.fastforex.io/currencies?api_key=${apiKey}`;
let resultArray = []; 

const options1 = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};

fetch(url, options1)
    .then(response => {
        if (response.ok) {
            return response.json(); 
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        for (let key in data.currencies) {
            resultArray.push({
                exchangeCode: key,
                exchangeLongName: key + " " + data.currencies[key],
            });
        }
        modelListCurr.setData(resultArray);
        modelListCurr1.setData(resultArray);
    })
    .catch(err => console.error(err));
















