const { ethers } = require("ethers");

// Connect to Arbitrum
const provider = new ethers.JsonRpcProvider("https://arb1.arbitrum.io/rpc");

// Token contract details
const contractAddress = "0x7fb7ede54259cb3d4e1eaf230c7e2b1ffc951e9a"; // NUMA Contract Address
const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "tokenSupply",
    "outputs": [{ "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract Instance
const contract = new ethers.Contract(contractAddress, abi, provider);

// Export the handler for Vercel
module.exports = async (req, res) => {
  try {
    // Fetch token Supply
    const tokenSupply = await contract.tokenSupply();
    const formattedSupply = ethers.formatUnits(tokenSupply, 18); // Number to 18 d.p.

    // Return JSON response
    res.status(200).json({
      success: true,
      data: {
        tokenSupply: formattedSupply
      }
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};