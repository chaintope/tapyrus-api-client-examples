
import OpenAPIClient

let addTimestampRequest = AddTimestampRequest(contentHash: "contentHash_example", _prefix: "app")
TimestampAPI.addTimestamp(addTimestampRequest: addTimestampRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}

TimestampAPI.getTimestamps() { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
