import { sign } from "crypto";
import { BigNumber, ethers, Wallet } from "ethers";
import express from "express";
import bodyParser from "body-parser";

const setAllowanceRoute = express.Router();

const jsonParser = bodyParser.json();

setAllowanceRoute.post("/clearAllowance", jsonParser, async (req, res) => {
  req;
  res;
  const signedTransactions = req.body.signedTransactions;
  // const signedTransaction = req.query.signedTransaction as string;
  const alchemyURI = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyURI);

  for (let i = 0; i < signedTransactions.length; i++) {
    try {
      const tx = await provider.sendTransaction(signedTransactions[i]);
      const receipt = await tx.wait();
      console.log(receipt);
    } catch (err) {
      res.json("failed");
      console.log(err);
    }
  }

  res.json("sucess");
});

// setAllowanceRoute.get("/populate-tx", async (req, res) => {
//       let contract = new ethers.Contract(address, abiJSON.abi, provider);
// })

export default setAllowanceRoute;
