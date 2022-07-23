import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {},
    mumbai: {
      url: process.env.MUMBAI_URL ?? "",
      chainId: 80001,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: process.env.MUMBAI_POLYGONSCAN_KEY ?? ""
  }
};

export default config;
