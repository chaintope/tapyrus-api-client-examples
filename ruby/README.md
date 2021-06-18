## How to build and use a local environment

1. Generate ruby client code

2. To run the sample code locally, install the gem with the following command.
```
$ gem build openapi_client.gemspec
$ gem install ./openapi_client-1.0.0.gem
```

3. Set each file with the access token of the user who will be calling the API.
```
access_token = "ya29.a0AfH6SMCCXiqb-VmA6XMquR....."
```

4. Run the scripts
```
$ ruby addresses.rb
```
