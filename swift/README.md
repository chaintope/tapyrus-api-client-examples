
# Requirements
- xcodegen
- cocoapods

1. Generate client libraly

2. Edit project.yml

Put the path to the generated swift client code in OpenAPIClient sources.

```
[...]
  OpenAPIClient:
    type: framework
    platform: iOS
    deploymentTarget: "9.0"
    sources: [/Users/oshikawa/out/tapyrus-api-client-swift/OpenAPIClient]
[...]
```

3. Run xcodegen command

```
$ xcodegen
```

4. Run the pod command

```
$ pod init
$ pod install
```