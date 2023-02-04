import db from "./db";

const FetchNonZeroAllowanceLedger = async (owner: string) => {
  return await db.raw(
    `SELECT * from approval_ledger where owner= '${owner}' and cast(amount as integer)> 0;`
  );
};

const FetchNonZeroAllowanceLedgerOneToken = async (
  owner: string,
  token: string
) => {
  return await db.raw(
    `SELECT * from approval_ledger where owner= '${owner}' and cast(amount as integer)> 0 and tokenaddress= '${token}';`
  );
};

export { FetchNonZeroAllowanceLedger, FetchNonZeroAllowanceLedgerOneToken };
