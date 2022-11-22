# Getting Started

ここでは Tapyrus API を利用した JavaScript のウェブアプリケーション開発の始め方について解説をします。 前提として Tapyrus ブロックチェーンや Tapyrus API の概要への理解が必要です。
未読の方は先に [Tapyrus API ドキュメント](https://doc.api.tapyrus.chaintope.com) のイントロダクションをご覧ください。

## このドキュメントのゴール

* OpenID Connect を使った認証と、Tapyrus API へのユーザー登録の方法を理解する。
* Access Token を利用し、Tapyrus API へリクエストを送る方法を理解する。
* トランザクションの発行をおこなう API を利用し、実際にブロックチェーンに作用する API の使い方を理解する。

## 作成するプロジェクトの構成

JavaScript を使ったウェブアプリケーションの構築を通して、ゴールの達成を目指します。

作成するプロジェクトでは、Tapryus API を利用して、受金するためのアドレスの取得、Tapyrus ブロックチェーンのネイティブコインである TPC の送金、残高の確認を行えるウェブアプリケーションを構築します。

なお、完成したプロジェクトは [example-app](./example-app) にあります。

### OpenID Connect を使った認証

また、構築の中では OpenID Connect を使った認証処理も構築します。 API へのアクセスに必要なアクセストークンを OpenID Connect の Authorization Code Flow を通して取得します。
ここでは OpenID Provider(OP) のサンプルとして https://accounts.google.com を利用します。 OP へのアプリケーションやリダイレクトURLの登録の方法は、利用する OP のドキュメントに従ってください。

OpenID Connect の詳細な情報は以下を参照してください。 この Getting Started ドキュメントはOpenID Connect
への詳しい理解がなくとも構築できるようにしていますが、ご参照いただければより正確な理解が得られます。

* [OpenID Connect Core 1.0 日本語訳](http://openid-foundation-japan.github.io/openid-connect-core-1_0.ja.html)

Google を OP として利用される方はまず [Google Cloud Platform のコンソール](https://console.cloud.google.com/home/dashboard) から
アプリケーションを追加し、以下のページの手順に従ってクレデンシャルの入手を行ってください。リダイレクトURLの設定は以降の手順の中で実施します。

* [OpenIDコネクト | Google Identity Platform | Google Developers](https://developers.google.com/identity/protocols/oauth2/openid-connect)

## 1. 新しいプロジェクトの作成

新しいプロジェクトを作成して、最初の Tapyrus API プロジェクトを始めましょう。

    $ mkdir example-app
    $ cd ./example-app
    $ npm init 

`npm init` を実行すると、プロジェクト名の入力を求められますが、ここではすべてエンターを押して進めてください。

ウェブアプリケーションフレームワークである [Express](https://expressjs.com/ja/) を利用しますのでインストールします。

    $ npm install express --save

初めに以下のシンプルなサーバープログラムを `index.js` というファイル名で作成しサーバーの起動を確認しましょう。

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

app.get('/', async (req, res) => {
  res.send('Hello, World!');
});
```

以下のコマンドでサーバーを起動します。

  $ node index.js

http://localhost:3000 へアクセスし、「Hello, World!」と表示されれば成功です。

## 2. OpenID Connect による認証

認証には simple-oauth2 という NPM パッケージを利用します。

* [simple-oauth2](https://www.npmjs.com/package/simple-oauth2)

プロジェクトに追加します。

    $ npm install simple-oauth2 --save

次に、`index.js` に認証のためのコードを追加します。

### 2.1. simple-oauth2 の読み込み

以下のコードを `index.js` の express のロードの次に追加して下さい。

```javascript
// ...
const port = 3000

// ここから下を 'index.js' へ追加
const { AuthorizationCode } = require('simple-oauth2');
```

### 2.2. Tapyrus API Dashboardで認証情報を設定する

Tapyrus API Dashboardにログインして認証情報(OpenID プロバイダー/クライアントアプリケーション)を設定します。
設定方法についてはTapyrus API Dashboardの[ユーザーガイド] > [OpenID Connectによる認証] を参照してください。
クライアントアプリケーションのコールバックURLには以下の文字列を設定してください。

- `http://localhost:3000/cb`

### 2.3. クライアント情報を設定する

以下のコードを 2.1. で追加したコードの下に追加してください。

```javascript
// Tapyrus API Dashboardで設定したクライアントアプリケーションのクライアントIDを設定します。自身の環境に合わせて修正してください。
const client_id = 'ここには Tapyrus API Dashboard で登録したクライアントアプリケーションの クライアントID の情報を入力します';
// クライアントシークレットは特に必要ありませんが、 simple-oauth2ライブラリを利用する際のパラメータとしてダミーの文字列を渡す必要があります。
const client_secret = 'dummy';
```
クライアントIDの値は、実際のあなたの環境に合わせた値に置き換えてください。

### 2.4. 変数の宣言

2.3 で追加したコードの下に以下の変数を宣言します。 これらは、サーバーのアクションをまたいで保持する必要があるオブジェクトを格納するために使います。

```javascript
let client;
let accessToken;
```

### 2.5. 認証用アクションを作成する

これから実際に OpenID Connect を使った認証のための処理を追加していきます。

#### 2.5.1. /authorize アクションの追加

`/authorize` のパスに認証用アクションを作ることにします。以下のコードを `index.js` に追加してください。

```javascript
const crypto = require('crypto');
let config = {
  client: {
    id: client_id,
    secret: "dummy"
  },
  auth: {
    tokenHost: `http://localhost:${port}/`,
    tokenPath: 'oauth2/v1/token',
    authorizeHost: `http://localhost:${port}/`,
    authorizePath: 'oauth2/v1/authorize'
  }
};

app.get('/authorize', async (req, res) => {
  client = new AuthorizationCode(config);
  const state = crypto.randomBytes(16).toString('base64').substring(0, 16);
  const authorizationUri = client.authorizeURL({
    redirect_uri: `http://localhost:${port}/cb`,
    scope: 'openid profile',
    state
  });
  res.redirect(authorizationUri);
});
```

ブラウザが `/authorize` へアクセスすると、認可用の URL へリダイレクトをします。 リダイレクト先は OPのウェブサイトであり、ユーザーはそちらで認証を受け、成功すれば先程設定したリダイレクト URL へアクセストークン等と一緒に返ってきます。

#### 2.5.2. トップページに /authorize へのリンクを追加する

次に、認証用アクションに遷移するためにトップページの表示にリンクを追加します。 トップページの処理を以下のように修正します。

```javascript
app.get('/', async (req, res) => {
  if (typeof accessToken == "undefined") {
    res.send("<a href=\"/authorize\">authorize</a>")
  } else {
    res.send('Hello, World!');
  }
});
```

認証に成功しアクセストークンを入手したら `accessToken` にセットすることにします。なので、 `accessToken` が `undefined` のときは認証されていないとみなし、認証アクションへのリンクを表示します。

#### 2.5.3. コールバックアクション `/cb` を追加する

最後に、リダイレクト URL でアクセスされるコールバックアクションを `/cb` というパスで作成します。 以下のコードを `index.js` へ追加してください。

```javascript
app.get('/cb', async (req, res) => {
  response = await client.getToken({ code: req.query.code });
  accessToken = response.token['access_token'];
  defaultClient.defaultHeaders = {Authorization: `Bearer ${accessToken}`};
  res.redirect('/');
});
```

コールバックでは`code` を受け取ります。 この`code`をアクセストークン取得のためのメソッドである `getToken` にパラメータとして渡します。
`getToken`メソッドが呼ばれると、クライアントはTapyrus APIに対してアクセストークンの取得を要求します。
Tapyrus APIでは`code`の検証を行い、`code`の検証に成功すると Tapyrus API ユーザーを登録し、そのアクセストークンをクライアントに返します。

Tapyrus API にアクセスするときにはこのアクセストークンをリクエストヘッダに以下のフォーマットで埋め込みます。

    Authorization: Bearer アクセストークン

アクセストークンには OP により設定された有効期限があります。 有効期限が切れたアクセストークンは利用できなくなります。

アクセストークン取得と同時にTapyrus APIでは、Tapyrus API ユーザーが作成されます。

Tapyrus API ユーザーは Tapyrus API にアクセスする際に必要なユーザーで、ユーザーごとに個別に認証を行うことで Tapyrus API へのアクセスが可能になります。
そのため上で入手したアクセストークン１つに付き１つの Tapyrus API ユーザーが必要です。

Tapyrus API ユーザーはウォレットを１つもっており、ユーザーごとに独立して Tapyrus のネイティブコインである TPC やトークンなどの資産の管理が可能です。
言い換えると、あなたのアプリケーションで独立して資産を管理したい単位で Tapyrus API ユーザーを作成することが出来ます。

## 3. クライアント証明書の利用

### 3.1. クライアント証明書の発行

Tapyrus APIに接続する際にはクライアント証明書を使用します。

Tapyrus API Dashboardの[クライアント証明書]メニューからTapyrus APIに接続する際に利用するクライアント証明書を発行することができます。
Tapyrus API Dashboardからダウンロードしたクライアント証明書(p12形式)は`index.js`と同じディレクトリに配置します。

### 3.2. tapyrus_api NPM パッケージの追加

Tapyrus API へアクセスするために、そのクライアントである NPM パッケージをプロジェクトに追加します。

    $ npm install tapyrus_api --save

次に、`index.js` のモジュールの読み込みが書いてある箇所に以下を追加します

```javascript
const tapyrusApiHost = 'Tapyrus API Dashboardから実際のエンドポイントのURLを入手して置き換えてください';
const TapyrusApi = require('tapyrus_api');
const defaultClient = TapyrusApi.ApiClient.instance;
defaultClient.basePath = `${tapyrusApiHost}/api/v1`;
```

`basePath` に設定するのは利用する Tapyrus API のエンドポイントです。 Tapyrus API Dashboardのホーム画面に表示されているAPIエンドポイントのURLを設定してください。

### 3.3. クライアント証明書の設定を追加する

変数 `config` を宣言している部分を以下のように変更します。証明書のダウンロード時にパスワードを設定しなかった場合は、`passphrase = '';` としてください。

```javascript
const https = require('node:https');
const http = require('node:http');
const fs = require('node:fs');

let config = null;

const cert = 'クライアント証明書ファイル名(p12)';
const passphrase = 'クライアント証明書のパスワード';

// Client certificate
if (fs.existsSync(cert)) {
  const options = {
    pfx: fs.readFileSync(cert),
    passphrase: passphrase
  };
  httpsAgent = new https.Agent(options);
  httpAgent = new http.Agent(options);
  defaultClient.requestAgent = httpsAgent;
  config = {
    client: {
      id: client_id,
      secret: client_secret
    },
    auth: {
      tokenHost: tapyrusApiHost,
      tokenPath: 'oauth2/v1/token',
      authorizeHost: tapyrusApiHost,
      authorizePath: 'oauth2/v1/authorize'
    },
    http: {
      agents: {
        https: httpsAgent,
        http: httpAgent,
        httpsAllowUnauthorized: httpsAgent
      }
    }
  };
} else {
  config = {
    client: {
      id: client_id,
      secret: client_secret
    },
    auth: {
      tokenHost: tapyrusApiHost,
      tokenPath: 'oauth2/v1/token',
      authorizeHost: tapyrusApiHost,
      authorizePath: 'oauth2/v1/authorize'
    }
  };
}
```

### 3.3. クライアント証明書を使用したアクセスの確認

OpenID Connect を使った認証がうまく動作するかを試します。

発行したクライアント証明書をクライアント環境にインストールします。インストールの方法はお使いのクライアント環境に依存します。
インストール後、サーバーを再起動し、ブラウザからアクセスします。

  $ node index.js

http://localhost:3000 へアクセスします。Node.js v17.0.0 以降では `--openssl-legacy-provider` オプションが必要な場合があります。

  $ node  --openssl-legacy-provider index.js

![image01](./images/01.png)

「authorize」をクリックするとブラウザから使用するクライアント証明書が求められますので、インストールしたクライアント証明書を選択して、処理を続行します。

OP の画面へ遷移するので、そこで認証を行います。 認証に成功すると、以下の Hello, World! 画面が表示されれば成功です。

![image02](./images/02.png)

## 4. アドレスの作成

次に、TPC を受金するためのアドレスを生成する API を使ってみます。

ここまでで Tapyrus API を実際に呼び出す準備が整いました。 早速送金などのトランザクションを発行する API を実行してみたいのですが、そのためには TPC を入手する必要があります。 作成したばかりのユーザーのウォレットには
TPC が入っていませんので、送金をすることが出来ません。 そこで、アドレスを生成します。

### 4.1. アドレス作成アクションを追加する

以下のコードを `index.js` に追加してください。

```javascript
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
```

`createAddress` API を利用してアドレスを生成します。 このアクションの実行に成功すると、サーバーを起動しているコンソールにアドレスが出力されます。

### 4.2. アドレス作成アクションを実行するボタンを追加する

`/` のアクションの

```javascript
res.send('Hello, World!');
```

を以下のコードに置き換えます。

```javascript
let html = "<h1>Hello, Tapyrus API!</h1>"
html += '<form action="/create_address" method="post"><button type="submit">Create Address</button></form>';
res.send(html);
```

再びサーバーを再起動して、ブラウザでアクセスし認証後の画面に「Create Address」ボタンが表示されていることを確認してください。
更にボタンを押すと、サーバーを起動しているターミナル上に生成したアドレスが表示されることを確認してください。

## 5. バランスとアドレス一覧の表示

このままだと、作成したアドレスを見れるのはターミナル上に表示される一度切りで、あとから確認することが出来ません。 そこで、トップページにこれまで生成したアドレスの一覧を表示するようにしてみます。
また、同時にユーザーのウォレットが持つ残高（バランス）も表示してみます。

`/` アクションの

```javascript
res.send(html);
```

を以下のように書き換えます。

```javascript
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
```

ユーザーの残高やアドレスの一覧の取得には `getUserInfo` API を利用します。
`getUserInfo` API の詳細は [API ドキュメント](https://doc.api.tapyrus.chaintope.com/#operation/getUserInfo) を参照してください。

API のコールに成功したら、HTML に書き出します。 サーバーを再起動し、 `/` にブラウザからアクセスすると、以下のように残高とアドレスが確認出来ます。

![image03](./images/03.png)

受金していませんので、バランスは0になっています。 アドレスは先程生成したアドレスが表示されています。

## 6. TPC を送金する

最後に TPC を送金してみます。 

### 6.1. 送金フォームの追加

`/` アクションの「Create Address」ボタンを作る行の下に以下のコードを追加します。

```javascript
html += '<h2>Payment</h2>'
  + '<form action="/payment" method="post">'
  + '<label>to address</label><input type="text" name="to_address" /><br/>'
  + '<label>amount</label><input type="text" name="amount"/><br/>'
  + '<label>fee</label><input type="text" name="fee" value="1000"/><br/>'
  + '<button type="submit">Pay!</button>'
  + '</form>';
```

サーバーを再起動してブラウザでアクセスすると以下のようにフォームが表示されます。

![image09](images/09.png)

### 6.2. 送金アクションを追加する

`index.js` に以下のコードを追加します。

```javascript
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
```

`/payment` に POST で

* address: 送金先のアドレス
* amount: 送金額
* fee: 手数料

が送られると、 Payment API の `transfer` API を利用して送金処理を実施します。

また、上部の

```javascript
const app = express();
```

の下に以下の行を追記します。

```javascript
app.use(express.urlencoded({extended: true}));
```

POST されたパラメータを express で扱うために必要な設定です。

### 6.3. 実際に送金する

サーバーを再起動し、ブラウザからアクセスします。

`to address` には、`createAddress` API を利用して作成したアドレスを入力します。
`amount` には `10000` と入力しましょう。
`fee` には `1000` を入力します。

ここで `amount` と `fee` に入力した値の単位は tapyrus で、1 tapyrus は 0.00000001 TPC に対応します。(1 TPC = 100000000 tapyrus)

入力したら「Pay!」ボタンをおして送金します。 成功するとサーバーを実行しているコンソールに以下のように txid が表示されます。

```
{"txid":"12d47d0de53c5f8b3df70fd8525f2c480217aff95f60488e4118808305991622"}
```

## おわり

お疲れ様でした。これで Getting Started は終了になります。 今回利用しなかった API を実行するサンプルコードも以下にありますので、合わせてご確認いただければ使い方について理解が進むと思います。

* [payment](./payments.js)
* [timestamp](./timestamps.js)
* [token](tokens.js)
* [address](./addresses.js)
* [user](./users.js)
