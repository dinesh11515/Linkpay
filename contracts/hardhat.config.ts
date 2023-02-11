import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-secure-accounts";
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: "https://dimensional-fabled-patron.matic-testnet.discover.quiknode.pro/52f7211c36c11560b648d2af0576acb8e9fb8062/",
    },
  },
};

export default config;
