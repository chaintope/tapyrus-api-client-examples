import OpenAPIClient

AddressAPI.address() { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        print(response)
        dump(response)
    }
}

let per = 10
let page = 1
AddressAPI.getAddresses(per: per, page: page) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        print(response)
        dump(response)
    }
}
