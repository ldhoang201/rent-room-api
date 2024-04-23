const cron = require("node-cron");
const knex = require("../config/knex");

module.exports.setExpiredJob = () => {
  cron.getTasks().clear();
  cron.schedule("0 22 * * *", async () => {
    try {
      const expiredPosts = await knex("posts")
        .whereNotNull("expired_in")
        .where("expired_in", "<", knex.fn.now());
      await knex("posts")
        .whereIn(
          "post_id",
          expiredPosts.map((post) => post.post_id)
        )
        .update({ available: false });
      console.log("Cron job ran successfully!");
    } catch (error) {
      console.error("Error running cron job:", error);
    }
  });
};
