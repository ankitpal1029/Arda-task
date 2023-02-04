import db from "./db";

const FetchNonZeroAllowanceLedger = async (owner: string) => {
  return await db.raw(`SELECT * from approval_ledger where owner= '${owner}';`);
};

export { FetchNonZeroAllowanceLedger };
