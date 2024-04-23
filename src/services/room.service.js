const knex = require("../config/knex");

const retrieveTypeList = async () => {
  return await knex.select("*").from("room_type");
};

const retrieveById = async (roomId) => {
  return await knex.select("*").from("room").where("room_id", roomId);
};

const retrieveByCriteria = async (criteria) => {
  try {
    let query = knex("room")
      .select("room.room_id")
      .leftJoin("room_detail", "room.room_id", "room_detail.room_id")
      .leftJoin(
        "room_type",
        "room_detail.room_type_id",
        "room_type.room_type_id"
      );

    if (criteria.min_price !== undefined && criteria.max_price !== undefined) {
      if (criteria.min_price === 0) {
        query = query.where("price", "<=", criteria.max_price * 1000000);
      } else {
        query = query.whereBetween("price", [
          criteria.min_price * 1000000,
          criteria.max_price * 1000000,
        ]);
      }
    }

    if (criteria.min_area !== undefined && criteria.max_area !== undefined) {
      if (criteria.min_area === 0) {
        query = query.where("area", "<=", criteria.max_area);
      } else {
        query = query.whereBetween("area", [
          criteria.min_area,
          criteria.max_area,
        ]);
      }
    }

    if (criteria.location_codes) {
      for (let i = 0; i < criteria.location_codes.length; i++) {
        const locationCode = criteria.location_codes[i];
        query = query.whereRaw(`location_codes[${i + 1}] = ?`, [locationCode]);
      }
    }

    if (criteria.room_type_name && criteria.room_type_name !== "all") {
      query = query.where("room_type.room_type_name", criteria.room_type_name);
    }

    const filteredRooms = await query;

    const roomIds = filteredRooms.map((room) => room.room_id);

    return roomIds;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const retrieveByArea = async (areaCodes) => {
  try {
    let query = knex("room")
      .select("room.room_id")
      .leftJoin("room_detail", "room.room_id", "room_detail.room_id")
      .leftJoin(
        "room_type",
        "room_detail.room_type_id",
        "room_type.room_type_id"
      );

    for (let i = 0; i < areaCodes.length; i++) {
      const locationCode = areaCodes[i];
      query = query.whereRaw(`location_codes[${i + 1}] = ?`, [locationCode]);
    }

    const filteredRooms = await query;

    const roomIds = filteredRooms.map((room) => room.room_id);

    return roomIds;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const save = async (roomData) => {
  const roomId = await knex("room").insert(roomData).returning("room_id");
  return roomId[0];
};

const update = async (newData, roomId) => {
  await knex("room").where("room_id", roomId).update(newData);
};

const remove = async (roomId) => {
  await knex("room").where("room_id", roomId).del();
};

module.exports = {
  retrieveTypeList,
  retrieveById,
  retrieveByCriteria,
  retrieveByArea,
  save,
  update,
  remove,
};
