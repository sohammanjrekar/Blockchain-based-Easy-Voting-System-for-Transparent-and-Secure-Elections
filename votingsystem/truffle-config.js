const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraKey = "8cbc7b4900394dfc80b163e139bc3872"; // Replace with your Infura Project ID
const mnemonic =
  "60da50202a47921c7022fcdea346f12d5434ad75299e2c7ac15a82fc12210190"; // Replace with your Metamask mnemonic
module.exports = {
  networks: {
    sepolia: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://sepolia.infura.io/v3/${infuraKey}`
        ),
      network_id: 11155111, // Sepolia's network id, // Sepolia's network id
      gas: 5500000, // Gas limit
      gasPrice: 1000000000, // 1 gwei (in wei)
    },
  },

  compilers: {
    solc: {
      version: "0.8.0", // Use the same compiler version as your contract
    },
  },
};
