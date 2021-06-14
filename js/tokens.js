let TapyrusApi = require('tapyrus_api');

// Set your Access Token
let accessToken = ""

let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${accessToken}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'

function getTokens(opts) {
  return new Promise((resolve, reject) => {
    api.tokensGet(opts, (err, data, response) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

function postTokens(opts) {
  return new Promise((resolve, reject) => {
    api.token(opts, (err, data, response) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}


// @route   GET /api/v1/tokens 
// @desc    Get the list of tokens
let opts = {};
getTokens(opts)
  .then(data => console.log(data))
  .catch(err => console.log(err))

// @route   POST /api/v1/tokens/issue 
// @desc    Get the list of tokens
let postTokensOpts = { amount: 1000 };
postTokens(postTokensOpts)
  .then(data => console.log(data))
  .catch(err => console.log(err))

  