import { ethers } from "hardhat";

const main = async () => {
  let deployer;

  [deployer] = await ethers.getSigners();
  const initialSupply = ethers.utils.parseEther("50");

  // Deploying ERC20 and giving 50 * 10^18 to address deployer
  const YangitERC20Factory = await ethers.getContractFactory("YangitERC20");
  const yangitERC20 = await YangitERC20Factory.deploy(initialSupply);
  await yangitERC20.deployed();

  // Deploying Mock Contract
  const MockContractFactory = await ethers.getContractFactory("MockContract");
  const mockContract = await MockContractFactory.deploy();
  await mockContract.deployed();

  // approve token 5 YGT transfer to Mock Contract
  const amountToApprove = ethers.utils.parseEther("5");
  await yangitERC20
    .connect(deployer)
    .approve(mockContract.address, amountToApprove);

  const val = await yangitERC20
    .connect(deployer)
    .allowance(deployer.address, mockContract.address);
  console.log(
    `[hardhat]: allowance is ${val
      .div(ethers.utils.parseEther("1"))
      .toString()} YGT`
  );
};
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
