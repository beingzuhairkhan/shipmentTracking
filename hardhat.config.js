require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // defaultNetwork: "hardhat",
  // networks: {
  //   hardhat: {
  //     chainId:31337
  //   },
  //   sepolia: {
  //     url: "https://eth-sepolia.g.alchemy.com/v2/JNHFxYFCLQVIyE_0-0MrZps0mO0TJVWk",
  //     accounts: ["513caeae55f94ac1a6c04248d568fff86ef197650a29fe836ddc8030a03afe71"]
  //   }
  // },
};
