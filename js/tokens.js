let TapyrusApi = require('tapyrus_api');

// Set your Access Token
let accessToken = ""

let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${accessToken}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'

let api = new TapyrusApi.TokenApi();

function getTokens(opts) {
  return new Promise((resolve, reject) => {
    api.tokensGet(opts, (err, data, response) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

function issueTokens(opts) {
  return new Promise((resolve, reject) => {
    api.token(opts, (err, data, response) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

function transferTokens(tokenId) {
  return new Promise((resolve, reject) => {
    api.sendToken(tokenId, (err, data, response) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

function burnTokens(tokenId, opts) {
  return new Promise((resolve, reject) => {
    api.burnToken(tokenId, opts, (err, data, response) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

// @route   GET /api/v1/tokens 
// @desc    Get the list of tokens
let getTokensOpts = { confirmationOnly: true };
getTokens(getTokensOpts)
  .then(data => console.log(data))
  .catch(err => console.log(err))

// @route   POST /api/v1/tokens/issue 
// @desc    Get the list of tokens
let issueTokenRequest = TapyrusApi.NewTokenRequest.constructFromObject({amount: 200, token_type: 1})
issueTokens(issueTokenRequest)
  .then(data => console.log(data))
  .catch(err => console.log(err))
 
// @route   POST /api/v1/tokens/issue 
// @desc    Get the list of tokens
let transferTokenId = "c1f679686676df6a8aceef468906081a6f3749d015567489efd822bcc946198259"
transferTokens(transferTokenId)
  .then(data => console.log(data))
  .catch(err => console.log(err))

// @route   POST /api/v1/tokens/issue 
// @desc    Get the list of tokens
let burnTokenId = "c1744ff7a83247eb2537789fb82fd1d26d0dd69fc96ab5952bb526e00804117a75"
let amount = { amount: 100 }
burnTokens(burnTokenId, amount)
  .then(data => console.log(data))
  .catch(err => console.log(err))