import db from "./db";

// const FetchEventsByOwner = (
//   owner: string,
//   spender: string,
//   amount: string,
//   blockstamp: string
// ) => {

//   //   db("approval_events").select("*").from("approval_events").
// };

const ModifyAllowance = async (
  owner: string,
  spender: string,
  updatedAmount: string
) => {
  return await db.raw(
    `INSERT INTO approval_ledger 
	(owner, spender, amount) 
	values ('${owner}', '${spender}', '${updatedAmount.toString()}')
    on conflict(owner, spender) 
    do UPDATE set 
	amount = '${updatedAmount.toString()}';`
  );
};

const FetchAllLedger = async () => {
  return await db("approval_events").select("*").from("approval_ledger");
};

export { ModifyAllowance, FetchAllLedger };
