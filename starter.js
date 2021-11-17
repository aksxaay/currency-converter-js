// axios will now autocomplete
const axios = require('axios');


// fixer
const FIXER_API_KEY = "72ef727c16501e04c8454e5cc14d3b2b"
const FIXER_API = `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}`;


// https://restcountries.eu
const REST_COUNTRIES_API = `https://restcountries.com/v3.1/currency`;


// async/await
// have 3 functions (async)

// fetch data about currencies
const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    // de-structured
    const {data: {rates}} = await axios.get(FIXER_API);
    const euro = 1 / rates[fromCurrency];
    const exchangeRate = euro * rates[toCurrency];
    console.log(`1 ${fromCurrency} is ${exchangeRate} ${toCurrency}`);
    return exchangeRate;
  }

  catch (error) {
    console.error(error);
    throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
  }
  
};

const getCountries = async (currencyCode) => {
// fetch data about the countries you can use the curr in 
  try {
    // destructured
    const {data} = await axios.get(`${REST_COUNTRIES_API}/${currencyCode}`);
    // get array of only countries
    return data.map((country) => country.name)    
    
  }
  catch (error) {
    throw new Error(`Unable to get countries that use ${currencyCode}`);
    console.error(error);
  }
};

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  fromCurrency = fromCurrency.toUpperCase();
  fromCurrency = fromCurrency.toUpperCase();

  // going to use promises and wait for all at once.
  // you don't even need the await (happens simultaneously)
    // destructure values
  const [exchangeRate, countries] = await Promise.all([
    getCountries(toCurrency),
    getExchangeRate(fromCurrency, toCurrency),
  ]) // 2s
  const convertedAmount = (amount * exchangeRate).toFixed(2);
  return (
    `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}.`
  );
}

// this is better..
// convertCurrency('USD', 'AED', 4200)
//     .then((result) => console.log(result))
//     .catch((error) => console.log(error))

getExchangeRate('USD', 'AED')
  .then((result) => console.log(result))
