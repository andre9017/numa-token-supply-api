const { ethers } = require("ethers");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Arb RPC
const provider = new ethers.JsonRpcProvider("https://arb1.arbitrum.io/rpc");

// NUMA contract details
const contractAddress = process.env.CONTRACT_ADDRESS; // Load address from .env
if (!contractAddress) {
  console.error("CONTRACT_ADDRESS is not defined in the environment variables.");
  throw new Error("CONTRACT_ADDRESS is missing. Please check your .env or environment variables.");
}

const abi = [
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// Instance of Contract
const contract = new ethers.Contract(contractAddress, abi, provider);

// Total Supply Endpoint
module.exports = async (req, res) => {
  try {
    // Fetch total supply from the blockchain
    const totalSupply = await contract.totalSupply();
    const formattedSupply = ethers.formatUnits(totalSupply, 18); // Number, allowing 18dp

    // Return the response
    res.status(200).json({
        total_supply: formattedSupply,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
