const { ethers } = require("ethers");

// Arb RPC
const provider = new ethers.JsonRpcProvider("https://arb1.arbitrum.io/rpc");

// NUMA contract details
const contractAddress = "0x7fb7ede54259cb3d4e1eaf230c7e2b1ffc951e9a"; // NUMA Contract Address
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

// Total Supply
module.exports = async (req, res) => {
  try {
    const totalSupply = await contract.totalSupply();
    const formattedSupply = ethers.formatUnits(totalSupply, 18); // Number to 18 d.p.

    res.status(200).json({
      data: {
        total_supply: formattedSupply,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
