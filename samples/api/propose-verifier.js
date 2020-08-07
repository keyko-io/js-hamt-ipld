const {LotusRPC} = require('@filecoin-shipyard/lotus-client-rpc')
const {NodejsProvider: Provider} = require('@filecoin-shipyard/lotus-client-provider-nodejs')
const VerifyAPIWallet = require('../../api/apiWallet.js')
const MockWallet = require('../mockWallet')
const {testnet} = require('@filecoin-shipyard/lotus-client-schema')
const fs = require('fs')
const signer = require("@keyko-io/filecoin-signing-tools/js")
//const methods = require('../../filecoin/methods')
const constants = require("../constants")

let endpointUrl = constants.lotus_endpoint
let tokenPath = constants.token_path 

const provider = new Provider(endpointUrl, {token: async () => {
    return fs.readFileSync(tokenPath)
}})

const client = new LotusRPC(provider, { schema: testnet.fullNode })

const mnemonic = 'robot matrix ribbon husband feature attitude noise imitate matrix shaft resist cliff lab now gold menu grocery truth deliver camp about stand consider number'
const path = "m/44'/1'/1/0/"
const mockWallet = new MockWallet(mnemonic, path)
const api = new VerifyAPIWallet(client, mockWallet)

//const mnemonic = 'robot matrix ribbon husband feature attitude noise imitate matrix shaft resist cliff lab now gold menu grocery truth deliver camp about stand consider number'
//let key = signer.keyDerive(mnemonic, "m/44'/1'/1/0/2", "")
//console.log("address", key.address)

async function main() {
    //let tx = methods.rootkey.propose(methods.verifreg.addVerifier("t01004", 100000000000000000000000000000000000000000n))
    /*
    console.log(tx)
    console.log("here", methods.encodeAddVerifier("t01004", 100000000000000000000000000000000000000000n).params.toString("hex"))
    let arg = methods.encodePropose("t080", methods.encodeAddVerifier("t01004", 100000000000000000000000000000000000000000n))
    console.log(arg.params.toString("hex"))
    console.log(tx.params.toString("hex"))
    */
    // await methods.sendTx(client, key, tx)
    await api.proposeVerifier("t01004", 100000000000000000000000000000000000000000n, 2)
    process.exit(0)
}

main()