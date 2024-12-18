const express = require("express");
const { ethers } = require("ethers");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Arbitrum
const provider = new ethers.JsonRpcProvider("https://arb1.arbitrum.io/rpc");

// Token contract details
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

// Endpoint for total supply
app.get("/tokenSupply", async (req, res) => {
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
