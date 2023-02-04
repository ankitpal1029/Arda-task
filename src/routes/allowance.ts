import { ethers } from "ethers";
import express from "express";
import { FetchNonZeroAllowanceLedger } from "../db/FetchLedger";

const router = express.Router();
const alchemyURI = process.env.ALCHEMY_URL;
const yangitERC20Address = process.env.YANGIT_ERC20 as string;
const anotherERC20Address = process.env.ANOTHER_ERC20 as string;

router.get("/getAllowance", async (req, res) => {
  res;
  const owner_address = req.query.owner_address as string;
  const nonZeroAllowances = await FetchNonZeroAllowanceLedger(owner_address);
  const response = nonZeroAllowances.rows.map((nonZeroAllowance: any) => {
    return {
      spender: nonZeroAllowance.spender,
      amount: nonZeroAllowance.amount,
      tokenaddress: nonZeroAllowance.tokenaddress,
    };
  });

  res.json(response);
});

export default router;
