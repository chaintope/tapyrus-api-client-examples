const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
const port = 3000;

const {Issuer, generators} = require('openid-client');
const code_verifier = generators.codeVerifier();

const TapyrusApi = require('tapyrus_api');
const defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.basePath = 'https://testnet-api.tapyrus.chaintope.com/api/v1';

// OpenID Connect client credentials. Modify for your own environment.
const issuer = '';
const client_id = '';
const client_secret = '';

let googleIssuer;
let oidcClient;
let accessToken;

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`)

  googleIssuer = await Issuer.discover(issuer);
  oidcClient = new googleIssuer.Client({
    client_id,
    client_secret,
    redirect_uris: [`http://localhost:${port}/cb`],
    response_types: ['code'],
  });

  console.log('oidc client ready');
})

app.get('/', async (req, res) => {
  if (typeof accessToken == "undefined") {
    res.send("<a href=\"/authorize\">authorize</a>")
  } else {
    let html = "<h1>Hello, Tapyrus API!</h1>"
    html += '<form action="/create_address" method="post"><button type="submit">Create Address</button></form>';
    html += '<h2>Payment</h2>'
      + '<form action="/payment" method="post">'
      + '<label>to address</label><input type="text" name="to_address" /><br/>'
      + '<label>amount</label><input type="text" name="amount"/><br/>'
      + '<label>fee</label><input type="text" name="fee" value="1000"/><br/>'
      + '<button type="submit">Pay!</button>'
      + '</form>';

    const userApi = new TapyrusApi.UserApi();
    userApi.getUserInfo({}, (error, data, response) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(data);

        html += '<h1>Balances</h1>';
        html += '<ul>';
        for (const tokenId in data.balances) {
          html += `<li>${tokenId}: ${data.balances[tokenId] || 0}</li>`;
        }
        html += '</ul>';

        html += '<h1>Addresses</h1>';
        html += '<ul>';
        for (const address of data.addresses) {
          html += `<li>${address}</li>`;
        }
        html += '</ul>';

        res.send(html);
      }
    });
  }
});

app.get('/authorize', async (req, res) => {
  const code_challenge = generators.codeChallenge(code_verifier);

  let authorizationUrl = oidcClient.authorizationUrl({
    scope: 'openid email profile',
    code_challenge,
    code_challenge_method: 'S256',
  });

  res.redirect(authorizationUrl);
});

app.get('/cb', async (req, res) => {
  const params = oidcClient.callbackParams(req);
  const tokenSet = await oidcClient.callback(`http://localhost:${port}/cb`, params, {code_verifier})

  const userApi = new TapyrusApi.UserApi();
  userApi.createUser({id_token: tokenSet.id_token, issuer, client_id, access_token: tokenSet.access_token}, (error) => {
    if (error) {
      console.error(error);
    } else {
      accessToken = tokenSet.access_token;
      TapyrusApi.ApiClient.instance.defaultHeaders = {Authorization: `Bearer ${accessToken}`}
    }

    res.redirect('/');
  });
});

app.post('/create_address', (req, res) => {
  let addressApi = new TapyrusApi.AddressApi();
  addressApi.createAddress((error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      res.redirect('/');
    }
  });
});

app.post('/payment', (req, res) => {
  const paymentApi = new TapyrusApi.PaymentApi();
  const paymentRequest = TapyrusApi.PaymentRequest.constructFromObject({
    address: req.body.to_address,
    amount: req.body.amount,
    fee: req.body.fee
  });

  paymentApi.transfer({paymentRequest}, (error, data, response) => {
    if (error) {
      console.error(error);
      res.redirect('/');
    } else {
      console.log(JSON.stringify(data));
      res.redirect('/');
    }
  });
});