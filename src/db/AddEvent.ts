import db from "./db";

const AddEvent = async (
  owner: string,
  spender: string,
  amount: string,
  blocknumber: string,
  tokenaddress: string
) => {
  await db("approval_events").insert({
    owner,
    amount,
    spender,
    blocknumber,
    tokenaddress,
  });
};

export { AddEvent };
