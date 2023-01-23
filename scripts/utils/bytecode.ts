/**
 * Get compiled (npx hardhat compile)
 * smart contract bytecode given smart contract name
 * 
 * 
 * @param fs FileSystem library instance
 * @param contractName Smart contract name
 * 
 * 
 * @returns 
 */
function getContractByteCode(fs, contractName: string): string {
    // Get file
    const contractFile = fs.readFileSync(`./artifacts/contracts/${contractName}.sol/${contractName}.json`, 'utf8');
    const contract = JSON.parse(contractFile)

    // Find bytecode
    const bytecode = contract['bytecode']

    return bytecode;
}

export { getContractByteCode }