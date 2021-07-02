let TapyrusApi = require('tapyrus_api');

let accsessToken = "";
let defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.defaultHeaders = { Authorization: `Bearer ${accsessToken}` }

// You can change the host name and port number
// defaultClient.basePath = 'http://localhost:3000/api/v1'


// @route   POST /api/v1/payment 
 // @desc   Sending tpc
let apiInstance = new TapyrusApi.PaymentApi();
let paymentOpts = {
  'paymentRequest': TapyrusApi.PaymentRequest.constructFromObject({
    address: "mvZy7U661vyRwk2BHnZ1c5vBxg6jvQAhKK",
    amount: 100000,
    fee: 10000
  })
};
apiInstance.payment(paymentOpts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data));
  }
});

