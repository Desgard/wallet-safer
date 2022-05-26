let tempRequest = ethereum.request
ethereum.request = function() {
    console.log('arguments', arguments)
    let result = tempRequest.apply(this, arguments)
    console.log('result', result)
    return result
}