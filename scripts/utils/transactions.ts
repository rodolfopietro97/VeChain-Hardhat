/**
 * Build a transaction to deploy a contract
 * 
 * @param Transaction 
 * @param connex 
 * @param bytecode 
 * @returns 
 */
function buildContractTransaction(Transaction, connex, bytecode: string, useSponsor: boolean) {
    // Init clauses of transaction
    const clauses = [{
        to: null,
        value: 0,
        data: bytecode
    }]

    // Calculate GAS -> https://docs.vechain.org/thor/learn/transaction-calculation.html
    // @NOTE: To improve
    const gas = 5000 + (Transaction.intrinsicGas(clauses) * 5)

    // Body of transaction
    const body = {
        chainTag: Number.parseInt(connex.thor.genesis.id.slice(-2), 16),
        blockRef: connex.thor.status.head.id.slice(0, 18),
        expiration: 32,
        clauses: clauses,
        gasPriceCoef: 128,
        gas,
        dependsOn: null,
        nonce: Math.ceil(Math.random() * 1000000),
        reserved: {
            features: useSponsor ? 1 : 0
        }
    }

    // Init transaction
    const transaction = new Transaction(body)

    return transaction
}

async function addAdditionalSignWithSponsor(axios, transaction, senderAddress: string, delegateUrl: string) {
    // Signature
    let finalSignature = undefined;

    // Sponsor request
    await axios.post(
        delegateUrl,
        {
            origin: senderAddress,
            raw: `0x${transaction.encode().toString('hex')}`
        }
    )
        .then((response) => {
            const { signature } = response.data
            finalSignature = signature
        })
        .catch((error) => {
            console.log(
                '\nERROR',
                `\n\t${JSON.stringify(error.response.data)}`,
                "\n"
            )
            process.exit(1)
        })

    // Get sponsor signature
    const sponsorSignature = Buffer.from(finalSignature.slice(2), 'hex')

    return sponsorSignature
}

export { buildContractTransaction, addAdditionalSignWithSponsor }