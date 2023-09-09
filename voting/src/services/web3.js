import Web3 from "web3";

// Initialize a web3 instance with the provider URL from Infura
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://sepolia.infura.io/v3/62a0ca4a39a1457cb1bef2d4bdcff4e3"
  )
);

// Replace '<INFURA_PROJECT_ID>' with your actual Infura Project ID

export default web3;
