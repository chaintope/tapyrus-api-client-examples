
import OpenAPIClient

let paymentRequest = PaymentRequest(address: "mr2zj3neXJa5EM1nftABJxXMY7HCHb7xWa", amount: 100000, fee: 10000)
PaymentAPI.payment(paymentRequest: paymentRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        print(response)
        dump(response)
    }
}
