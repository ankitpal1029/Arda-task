import { ethers } from "ethers";
import abiJSON from "../YangitERC20.json";
import { AddEvent } from "./db/AddEvent";
import { FetchAllLedger, ModifyAllowance } from "./db/ModifyLedger";
import dotenv from "dotenv";

dotenv.config();
const alchemyURI = process.env.ALCHEMY_URL;
const yangitERC20Address = process.env.YANGIT_ERC20 as string;
const anotherERC20Address = process.env.ANOTHER_ERC20 as string;

const supportedERC20 = [
  { address: yangitERC20Address, name: "YANGIT" },
  { address: anotherERC20Address, name: "ANOTHER" },
];

export const main = async () => {
  supportedERC20.forEach(
    async ({ address, name }: { address: string; name: string }) => {
      name;
      const provider = new ethers.providers.JsonRpcProvider(alchemyURI);
      let ygtContract = new ethers.Contract(address, abiJSON.abi, provider);
      const events = await ygtContract.queryFilter("Approval");
      let unique = new Set();
      let uniquePairs: any[] = [];

      events.forEach((event: any) => {
        if (
          !unique.has(
            event?.args?.owner.toString() +
              event?.args?.spender.toString() +
              event?.address
          )
        ) {
          unique.add(
            event?.args?.owner.toString() +
              event?.args?.spender.toString() +
              event?.address
          );
          uniquePairs.push({
            owner: event?.args?.owner,
            spender: event?.args?.spender,
            tokenaddress: event?.address,
          });
        }
      });

      uniquePairs.forEach(async (event) => {
        const currentAllowance = await ygtContract.allowance(
          event.owner,
          event.spender
        );
        await ModifyAllowance(
          event.owner,
          event.spender,
          currentAllowance.toString(),
          event.tokenaddress
        );
      });

      events.forEach(async (event) => {
        await AddEvent(
          event?.args?.owner,
          event?.args?.spender,
          event?.args?.value.toString(),
          event?.blockNumber.toString(),
          event?.address
        );
      });

      await ygtContract.on("Approval", async (owner, spender, amount) => {
        // const events = await ygtContract.queryFilter("Approval");
        // const timestamp = await (await events[0].getBlock()).timestamp;
        const blocknumber = await provider.getBlockNumber();
        console.log(
          `[offchain]: Approval Event > from: ${owner} to: ${spender} value: ${amount.toString()}`
        );

        try {
          console.log("> address", address);
          await AddEvent(
            owner,
            spender,
            amount.toString(),
            blocknumber.toString(),
            address
          );
          // const currentAllowance = await ygtContract.allowance(owner, spender);
          await ModifyAllowance(owner, spender, amount.toString(), address);

          await updateOthersInLedger(address);
        } catch (err) {
          console.log(err);
        }
      });

      await ygtContract.on("Transfer", async (from, to, value) => {
        console.log(
          `[offchain]: Transfer Event > from: ${from} to: ${to} value: ${value}`
        );
        try {
          await updateOthersInLedger(address);
        } catch (err) {
          console.log(err);
        }
      });
    }
  );

  console.log("[offchain]: listending for approvals");
};

const updateOthersInLedger = async (tokenaddress: string) => {
  const provider = new ethers.providers.JsonRpcProvider(alchemyURI);
  let ygtContract = new ethers.Contract(tokenaddress, abiJSON.abi, provider);
  try {
    const ledgerEntries = await FetchAllLedger();
    console.log(ledgerEntries);
    ledgerEntries.forEach(async ({ owner, spender }) => {
      const currentAllowance = await ygtContract.allowance(owner, spender);
      // console.log("> currentAllowance :", currentAllowance);
      // console.log("> owner :", owner);
      // console.log("> spender :", spender);

      await ModifyAllowance(
        owner,
        spender,
        currentAllowance.toString(),
        tokenaddress
      );
    });
  } catch (err) {
    console.log(err);
  }
};
