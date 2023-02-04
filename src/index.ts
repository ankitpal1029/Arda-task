import express from "express";
import dotenv from "dotenv";
import { ethers } from "ethers";
import abiJSON from "../YangitERC20.json";
import { AddEvent } from "./db/AddEvent";
import { FetchEventsUniqueOwners } from "./db/FetchEvents";
import { FetchAllLedger, ModifyAllowance } from "./db/ModifyLedger";
import { stringify } from "querystring";

dotenv.config();

const app = express();
const port = process.env.PORT;
const alchemyURI = process.env.ALCHEMY_URL;
const yangitERC20Address = process.env.YANGIT_ERC20 as string;

// app.get("/yo", async (_, res) => {
//   const provider = new ethers.providers.JsonRpcProvider(alchemyURI);
//   // const BACKEND_WALLET_PVT_KEY = process.env.BACKEND_WALLET_PVT_KEY as string;
//   // const signer = new ethers.Wallet(BACKEND_WALLET_PVT_KEY, provider);

//   // emit Approval(owner, spender, amount);
//   // let ygtContract = new ethers.Contract(erc20, abiJSON.abi, provider);
//   let ygtContract = new ethers.Contract(
//     yangitERC20Address,
//     abiJSON.abi,
//     provider
//   );

//   // const ygtContract = new ethers.providers.AlchemyProvider(
//   //   "https://eth-goerli.g.alchemy.com/v2/SPd7VteBVbgcrj2NqjUd-xVJtdfcQUn6"
//   // );
//   // const account1 = "0x657D3C03e450E4815f3411Aa26713A2A90e9Ad83";
//   // const account2 = "0x6b531D03dEF4d25e3fc300b88c032a1f620D22B0";
//   // let ygtUser = ygtContract.connect(signer);

//   const events = await ygtContract.queryFilter("Approval");
//   console.log(events);
//   // const val = await ygtUser.allowance(account1, account2);
//   // console.log(val);
//   res.send("sdfd");
// });

// app.listen(port, async () => {
//   console.log(`[server]: server is runing at http://localhost:${port}`);
//   // const events = await ygtContract.queryFilter("");
//   // console.log(events);
// });

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(alchemyURI);
  let ygtContract = new ethers.Contract(
    yangitERC20Address,
    abiJSON.abi,
    provider
  );

  await ygtContract.on("Approval", async (owner, spender, amount) => {
    // const events = await ygtContract.queryFilter("Approval");
    // const timestamp = await (await events[0].getBlock()).timestamp;
    const blocknumber = await provider.getBlockNumber();

    try {
      await AddEvent(owner, spender, amount.toString(), blocknumber.toString());
      // const currentAllowance = await ygtContract.allowance(owner, spender);
      await ModifyAllowance(owner, spender, amount.toString());

      await updateOthersInLedger();
    } catch (err) {
      console.log(err);
    }
  });
  console.log("[offchain]: listending for approvals");
};

const updateOthersInLedger = async () => {
  const provider = new ethers.providers.JsonRpcProvider(alchemyURI);
  let ygtContract = new ethers.Contract(
    yangitERC20Address,
    abiJSON.abi,
    provider
  );
  try {
    const ledgerEntries = await FetchAllLedger();
    console.log(ledgerEntries);
    ledgerEntries.forEach(async ({ owner, spender, amount }) => {
      console.log(amount);
      const currentAllowance = await ygtContract.allowance(owner, spender);
      await ModifyAllowance(owner, spender, currentAllowance.toString());
    });
  } catch (err) {
    console.log(err);
  }
};

main();
