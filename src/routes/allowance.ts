import express from "express";
import { FetchNonZeroAllowanceLedger } from "../db/FetchLedger";

const allowanceRoute = express.Router();

allowanceRoute.get("/getAllowance", async (req, res) => {
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

export default allowanceRoute;
