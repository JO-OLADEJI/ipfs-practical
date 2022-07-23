import { ContractFactory, Contract } from "ethers";
import hre, { ethers } from "hardhat";

async function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time * 1000));
}

async function main() {
  const metadataURI = "ipfs://QmYc15Cg9mv5UMnmC31oR4usXJs35n7Bn3DDWtfy9fyYV3/";
  const LW3PunksCF: ContractFactory = await ethers.getContractFactory(
    "LW3Punks"
  );
  const LW3PunksContract: Contract = await LW3PunksCF.deploy(metadataURI);
  await LW3PunksContract.deployed();

  console.log(`LW3Punks contract deployed at ${LW3PunksContract.address}`);

  // verify contract on mumbai polygonscan
  const delayTime = 60;
  console.log(
    `Waiting ${delayTime} seconds for Mumbai Polygonscan to index LW3Punks contract`
  );
  await delay(delayTime);

  await hre.run("verify:verify", {
    address: LW3PunksContract.address,
    contract: "contracts/LW3Punks.sol:LW3Punks",
    constructorArguments: [metadataURI],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
