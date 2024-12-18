const hre = require('hardhat');

async function main() {
    // const [deployer] = await ethers.getSigners();
    // console.log("Deploying contracts with the account:", deployer.address);

    // const Tracking = await ethers.getContractFactory("Tracking");
    // const tracking = await Tracking.deploy();

    // console.log("Tracking contract deployed to:", tracking.address);

    const Tracking = await hre.ethers.getContractFactory("Tracking");
    const tracking = await Tracking.deploy();

    await tracking.deployed();
    console.log("Tracking contract deployed to:", tracking.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
