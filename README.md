# tapyrus-api-client-examples

This repository is a sample code of client library generated from Tapyrus API's swagger.yml using [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator).

We support the following five programming languages.
  - javascript
  - ruby
  - Java
  - python
  - swift

## How to generate a client

This document explains how to generate the client code using Docker.
Detailed installation instructions can be found in the [OpenAPI Generator Github repository](https://github.com/OpenAPITools/openapi-generator#16---docker).


To generate the code using Docker, use the [OpenAPI Generator CLI Docker Image](https://hub.docker.com/r/openapitools/openapi-generator-cli/).

1. clone tapyrus-api repository

```
$ git clone https://github.com/chaintope/tapyrus-api.git
```

2. cd into the tapyus-api dir

```
$ cd tapyrus-api
```

3. generate the client code by specifying the following options and executing generate.

 - `-i`: path to the swagger.yml of tapyrus-api
 - `-g`: The programming language of the client code to generate.
 - `-o`: The directory path to output to.

The path of swagger.yml can be a local directory path or a global URL.

```
$ docker run --rm \
    -w /work \
    -v ${PWD}:/work openapitools/openapi-generator-cli generate \
    -i /work/public/swagger.yml \
    -g javascript \
    -o /work/out/tapyrus-api-client-js
```

Executing this command will generate the client code directory in the specified `OUTPUT_DIR_PATH`.

In the generated directory, `README.md` describes how to configure the client library for use in a local environment.
Please follow the instructions in `README.md` and try to run the sample code in this repository.

