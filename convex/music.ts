import { query } from "./_generated/server";

export const listMusic = query({
  args: {},
  handler: async (ctx) => {
    const beats = await ctx.db.query("beats").collect();
    return Promise.all(
      beats.map(async (beat) => {
        return {
          ...beat,
          musicUrl: await ctx.storage.getUrl(beat.storageId),
        };
      })
    );
  },
});
