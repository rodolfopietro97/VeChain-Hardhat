/**
 * Init type
 */
type InitType = {
    // Filesystem node library
    fs: any,

    // Vechain Connex
    connex: any,

    // Thor-Devkit
    mnemonic: any,
    Transaction: any,
    secp256k1: any,
    address: any,
    HDNode: any,

    // Axios requests
    axios: any
}

/**
 * Account type
 */
type AccountType = {
    walletAddress: any,
    privateKey: any,
    wordlist: string
}

export { type InitType, type AccountType }