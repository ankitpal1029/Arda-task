import db from "./db";

const ModifyAllowance = async (
  owner: string,
  spender: string,
  updatedAmount: string,
  tokenaddress: string
) => {
  return await db.raw(
    `INSERT INTO approval_ledger 
	(owner, spender, amount, tokenaddress) 
	values ('${owner}', '${spender}', '${updatedAmount.toString()}', '${tokenaddress}')
    on conflict(owner, spender, tokenaddress) 
    do UPDATE set 
	amount = '${updatedAmount.toString()}';`
  );
};

const FetchAllLedger = async () => {
  return await db("approval_events").select("*").from("approval_ledger");
};

const DeleteAllLedger = async () => {
  await db.raw("delete from approval_ledger");
};

export { ModifyAllowance, FetchAllLedger, DeleteAllLedger };
