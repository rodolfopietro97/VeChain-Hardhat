import { AccountType } from "./types"

/**
 * Generate account given wordlist
 * 
 *  
 * @param mnemonic Thor-Kit mnemonic instance
 * @param secp256k1 Thor-Kit secp256k1 instance
 * @param address Thor-Kit address instance
 * @param HDNode Thor-Kit HDNode instance
 * @param wordlist Mnemonics of account
 * 
 * 
 * @returns Account 
 */
function getAccount(mnemonic, secp256k1, address, HDNode, wordlist: Array<string>): AccountType {
    // Account variable
    let account: AccountType = {
        walletAddress: undefined,
        privateKey: undefined,
        wordlist: wordlist.join(" ")
    }

    // const privateKey = mnemonic.derivePrivateKey(wordlist)
    const privateKey = HDNode.fromMnemonic(wordlist).derive(0).privateKey
    const publicKey = secp256k1.derivePublicKey(privateKey)

    // Set account variable
    account.walletAddress = address.fromPublicKey(publicKey)
    account.privateKey = privateKey


    return account
}

export { getAccount }