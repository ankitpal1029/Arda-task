import dotenv from "dotenv";
import { DeleteAllLedger } from "./db/ModifyLedger";
import { DeleteAllEvents } from "./db/DeleteEvents";
import { main } from "./offchain";
import express from "express";

dotenv.config();

main();

const app = express();
const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`[api]: express is listening on port ${port}`);
});

process.on("SIGINT", async () => {
  console.log("[offchain]: caught interupt signal");
  await DeleteAllLedger();
  console.log("[offchain]: deleted approval_ledger table");
  await DeleteAllEvents();
  console.log("[offchain]: deleted approval_events table");
  server.close(() => {
    console.log("[api]: closing api port");
    process.exit(0);
  });
});
