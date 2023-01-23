// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
 * Simple test contract
 */
contract Test {
    
    /**
     * Simple variable
     */
    string public hello = "Hello!";
    
    /**
     * Address is valid
     */
    modifier validAddress(address _address) {
        require(_address != address(0), "Invalid address");
        _;
    }

    /**
     * Greeting function
     */
    function greetingsFromValidAddress(address account) public view validAddress(account) returns (string memory) {
        return hello;
    }

    /**
     * Set greetings
     */
    function setGreetings(string calldata _hello) public {
        hello = _hello;
    }

}
