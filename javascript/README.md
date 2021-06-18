
## How to build and use a local environment

1. Generate js client code 

2. Build and install npm package as a global package

```
$ cd /path/to/generated/js/client
$ npm install
$ npm link
$ npm build
$ npm install .
```

3. Link the installed package to here

```
$ cd /path/to/tapyrus-api-client-examples/js
$ npm link tapyrus_api
```

4. Set each file with the access token of the user who will be calling the API.

```
let accsessToken = "ya29.a0AfH6SMCCXiqb-VmA6XMquR.....";
```

5. Run the scripts

```
$ node addresses.js
```