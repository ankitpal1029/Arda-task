import db from "./db";
const DeleteAllEvents = async () => {
  await db.raw("delete from approval_events");
};

export { DeleteAllEvents };
