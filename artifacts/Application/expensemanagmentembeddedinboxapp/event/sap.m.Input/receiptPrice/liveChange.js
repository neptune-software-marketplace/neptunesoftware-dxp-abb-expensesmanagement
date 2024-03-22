var eur = inSimpleFormInvoiceDetailTotal.getValue();

function getFirstWord(string) {
  // Split the string by space characters.
  const words = string.split(' ');

  // Get the first word and return it.
  const firstWord = words[0];
  return firstWord;
}

const money = getFirstWord(eur);



var zarNumber = money;
var fromcurr = SelectCurr1.getValue();
var tocurr = SelectCurr2.getValue();
console.log("amount from curr",zarNumber);

console.log("amount from number",fromcurr);

console.log("amount to curr",tocurr);

function parseToFloat(strNum) {
    let thousandSeparator, decimalSeparator;
    if (strNum.indexOf(",") < strNum.indexOf(".")) {
        thousandSeparator = ",";
        decimalSeparator = ".";
    } else {
        thousandSeparator = ".";
        decimalSeparator = ",";
    }
    strNum = strNum.replace(new RegExp(`\\${thousandSeparator}`, 'g'), "");
    strNum = strNum.replace(decimalSeparator, ".");

    return parseFloat(strNum);
}

function removeLetters(str) {
    return str.replace(/[^\d.]/g, '');
}

const numericAmount = removeLetters(zarNumber);


console.log(parseToFloat(numericAmount)); 
var floatNum = parseToFloat(numericAmount);

function transactionResponse(response){
const firstCurrencyKey = Object.keys(response.result)[0];
const firstCurrencyValue = response.result[firstCurrencyKey];
console.log(firstCurrencyValue);
InputNewCurr.setValue(firstCurrencyValue);
}


  const convertCurrency = (from, to, amount, apiKey) => {
    const url = `https://api.fastforex.io/convert?from=${from}&to=${to}&amount=${amount}&api_key=${apiKey}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(response => transactionResponse(response))
        .catch(err => console.error(err));
};

const fromCurrency = fromcurr;
const toCurrency = tocurr;
const amountToConvert = floatNum;
const apiKey = "ReplaceMe";

convertCurrency(fromCurrency, toCurrency, amountToConvert, apiKey);







