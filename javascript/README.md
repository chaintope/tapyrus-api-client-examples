
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

4. Run the scripts
```
$ node addresses.js
```