let TapyrusApi = require('tapyrus_api');

// Set your Access Token
let access_token = ""

let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${access_token}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'

function get_tokens(opts) {
  return new Promise((resolve, reject) => {
    api.tokensGet(opts, (err, data, response) => {
      if (err) reject(err);
      resolve(data);
    })
  })
}

// Verification: Success
// @route   GET /api/v1/tokens 
// @desc    Get the list of tokens
let opts = {};
get_tokens(opts)
  .then(data => console.log(data))
  .catch(err => console.log(err))

// Verification: Failed
// @route   POST /api/v1/tokens/issue 
// @desc    Get the list of tokens
let post_tokens_opts = { amount: 1000 };
post_tokens(post_tokens_opts)
  .then(data => console.log(data))
  .catch(err => console.log(err))