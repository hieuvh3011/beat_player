import { query } from "./_generated/server";

export const getMusic = query(async ({ db }) => {
  const musicList = await db.query("beats").collect();
  return musicList;
});