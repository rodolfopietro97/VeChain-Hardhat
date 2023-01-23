import { InitType } from './types'

/**
 * Init main libraries useful for this script
 * 
 * 
 * @param networkUrl Node endpoint url
 * 
 * 
 * @returns Main libraries isntances
 */
async function initMainDependenciesAndVariables(networkUrl: string): Promise<InitType> {
    // File system
    const fs = await import('fs')

    // Connext Dependencies
    const { Framework } = await import('@vechain/connex-framework')
    const { Driver, SimpleNet } = await import('@vechain/connex-driver')

    // thor-devkit dependencies
    const { mnemonic, Transaction, secp256k1, address, HDNode } = require('thor-devkit')

    // Set network and driver (connex) given vechain info
    const vechainNetwork = new SimpleNet(networkUrl)
    const driver = await Driver.connect(vechainNetwork)

    // Connex instance object
    const connex = new Framework(driver)

    // Axios http requests
    const axios = await import('axios')

    return {
        // Filesystem node library
        fs: fs,

        // Vechain Connex
        connex: connex,

        // Thor-Devkit
        mnemonic: mnemonic,
        Transaction: Transaction,
        secp256k1: secp256k1,
        address: address,
        HDNode: HDNode,

        // Axios
        axios
    }
}

export { initMainDependenciesAndVariables }