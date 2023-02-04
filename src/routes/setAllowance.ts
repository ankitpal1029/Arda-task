import { sign } from "crypto";
import { BigNumber, ethers, Wallet } from "ethers";
import express from "express";

const setAllowanceRoute = express.Router();

setAllowanceRoute.get("/clearAllowance", async (req, res) => {
  req;
  res;
  const signedTransaction = req.query.signedTransaction as string;
  const alchemyURI = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyURI);
  const tx = await provider.sendTransaction(signedTransaction);
  const receipt = await tx.wait();
  console.log(receipt);

  console.log("sdfksdj");
  res.json("yo");
});

// setAllowanceRoute.get("/populate-tx", async (req, res) => {
//       let contract = new ethers.Contract(address, abiJSON.abi, provider);
// })

export default setAllowanceRoute;
