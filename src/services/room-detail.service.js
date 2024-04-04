const knex = require("../config/knex");

const save = async (roomDetailData) => {
  await knex("room_detail").insert(roomDetailData);
};

const update = async (newData, roomId) => {
  try {
    await knex("room_detail").where("room_id", roomId).update(newData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const remove = async (roomDetailId) => {
  await knex("room_detail").where("room_detail_id", roomDetailId).del();
};

module.exports = {
  save,
  update,
  remove,
};
