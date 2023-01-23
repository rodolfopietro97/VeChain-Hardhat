import { getAccount } from './utils/Accounts';
import { getContractByteCode } from './utils/bytecode';
import { initMainDependenciesAndVariables } from './utils/init';
import { addAdditionalSignWithSponsor, buildContractTransaction } from './utils/transactions';

/**
 * Mnemonics to use for sign and deploy contract
 * 
 * This is a test account :D
 */
const MNEMONICS = [
    'vivid',
    'any',
    'call',
    'mammal',
    'mosquito',
    'budget',
    'midnight',
    'expose',
    'spirit',
    'approve',
    'reject',
    'system'
]

/**
 * Address of a node
 */
const NETWORK_URL = 'https://testnet.veblocks.net/'

/**
 * URL of a delegate (and decide if use a delegate or not)
 */
const DELEGATE_URL = "https://sponsor-testnet.vechain.energy/by/90"
const USE_SPONSOR = true

/**
 * URL of block explorer
 */
const EXPLORER_URL = "https://explore-testnet.vechain.org/"

/**
 * Enable verbose mode
 */
const VERBOSE = true

/**
 * Name of smart contract to deploy (WITHOUT .sol)
 */
const CONTRACT_NAME = "Test"


/**
 * Main
 */
async function main() {

    // 1. ---------- Main Imports and Variables ----------
    const {
        // Filesystem node library
        fs,

        // Vechain Connex
        connex,

        // Thor-Devkit
        mnemonic,
        Transaction,
        secp256k1,
        address,
        HDNode,

        // Axios
        axios
    } = await initMainDependenciesAndVariables(NETWORK_URL);

    // 2. ---------- Get bytecode of contract to deploy ----------
    const bytecode = getContractByteCode(fs, CONTRACT_NAME)

    if (VERBOSE)
        console.log(
            '\nCONTRACT INFO',
            `\n\tContract ByteCode: ${bytecode.slice(0, 128)}...`)

    // 3. ---------- Init account used to deploy ----------
    const { walletAddress, privateKey, wordlist } = getAccount(mnemonic, secp256k1, address, HDNode, MNEMONICS)

    if (VERBOSE)
        console.log(
            '\nACCOUNT INFO',
            `\n\tAddress: ${walletAddress}`,
            `\n\tPrivate Key: ${privateKey}`,
            `\n\tWordlist: ${wordlist}\n`
        )

    // 4. ---------- Build transaction ----------
    const transaction = buildContractTransaction(Transaction, connex, bytecode, USE_SPONSOR)

    // 5. ---------- Sign transaction ----------
    const sponsorSignature = USE_SPONSOR ? await addAdditionalSignWithSponsor(axios, transaction, walletAddress, DELEGATE_URL) : "NOT USED"
    const originSignature = secp256k1.sign(transaction.signingHash(), privateKey)

    transaction.signature = USE_SPONSOR ?
        Buffer.concat([
            originSignature,
            sponsorSignature
        ]) : originSignature

    // 6. ---------- Create raw transaction ----------
    const rawTransaction = `0x${transaction.encode().toString('hex')}`

    if (VERBOSE)
        console.log(
            '\TRANSACTION INFO',
            `\n\tRaw Transaction: ${rawTransaction.slice(0, 128)}...`,
            `\n\tMy signature: ${originSignature.toString('hex')}`,
            `\n\tSponsor signature: ${sponsorSignature.toString('hex')}`
        )

    // 7. ---------- Publish transaction ----------
    await axios.post(
        `${NETWORK_URL}transactions`,
        { raw: rawTransaction }
    )
        .then((response) => {
            const { id } = response.data

            console.log(
                '\nTRANSACTION',
                `\n\t${EXPLORER_URL}transactions/${id}`,
                "\n"
            )
        })
        // There are some error in publish transaction :(
        .catch((error) => {
            console.log(
                '\nERROR',
                `\n\t${error.response.data}`,
                "\n"
            )
            process.exit(1)
        })

    process.exit(0)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
    process.exit()
});
