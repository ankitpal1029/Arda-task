import db from "./db";

const FetchEventsUniqueOwners = async () => {
  return await db("approval_events")
    .select("*")
    .from("approval_events")
    .distinct("owner");
};

export { FetchEventsUniqueOwners };
