import OpenAPIClient


let issueTokenRequest = IssueTokenRequest(amount: 10000, tokenType: 1)
TokenAPI.issueToken(issueTokenRequest: issueTokenRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}


let confirmationOnly = true
TokenAPI.getTokens(confirmationOnly: confirmationOnly) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}



let reissueTokenId = "c188e03f57710b78487921c03c6aa65486b587b1c424870d0f0973f32681d2f71d"
let reissueTokenRequest = ReissueTokenRequest(amount: 10000)
TokenAPI.reissueToken(tokenId: reissueTokenId, reissueTokenRequest: reissueTokenRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}


let transferTokenId = "c188e03f57710b78487921c03c6aa65486b587b1c424870d0f0973f32681d2f71d"
let transferTokenRequest = TransferTokenRequest(address: "mr2zj3neXJa5EM1nftABJxXMY7HCHb7xWa", amount: 10000)
TokenAPI.transferToken(tokenId: transferTokenId, transferTokenRequest: transferTokenRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}


let burnTokenId = "c188e03f57710b78487921c03c6aa65486b587b1c424870d0f0973f32681d2f71d"
let amount = 10000
TokenAPI.burnToken(tokenId: burnTokenId, amount: amount) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
