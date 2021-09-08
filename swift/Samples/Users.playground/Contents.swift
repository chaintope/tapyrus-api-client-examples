
import OpenAPIClient

let confirmationOnly = true
UserAPI.userinfo(confirmationOnly: confirmationOnly) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
