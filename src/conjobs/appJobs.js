const cron = require("node-cron");
const knex = require("../config/knex");

const updateExpiredPosts = async () => {
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

    console.log("Expired posts updated successfully!");
  } catch (error) {
    console.error("Error updating expired posts:", error);
  }
};

const updateExpiredUserServices = async () => {
  try {
    const expiredUserServices = await knex("users")
      .whereNotNull("service_expiry_date")
      .where("service_expiry_date", "<", knex.fn.now());

    await knex("users")
      .whereIn(
        "user_id",
        expiredUserServices.map((user) => user.user_id)
      )
      .update({
        service_id: 4,
        service_expiry_date: null,
      });

    console.log("Expired user services updated successfully!");
  } catch (error) {
    console.error("Error updating expired user services:", error);
  }
};

module.exports.setExpiredJob = () => {
  cron.getTasks().clear();
  cron.schedule("57 21 * * *", async () => {
    try {
      console.log("runjob");
      await Promise.all([updateExpiredPosts(), updateExpiredUserServices()]);

      console.log("Cron job ran successfully!");
    } catch (error) {
      console.error("Error running cron job:", error);
    }
  });
};
