const knex = require("../config/knex");
const postService = require("./post.service");
const roomImageService = require("./room-image.service");
const { keywords } = require("../utils/keywords");
const fs = require("fs");
const { G4F } = require("g4f");

const retrieveByUserQuery = async (query) => {
  try {
    if (!query.includes("room_id")) {
      return [];
    }
    query = query.replace(";", "");
    const queryWithLimit = `${query} LIMIT 3`;

    const result = await knex.raw(queryWithLimit);
    console.log(result.rows[0]);
    if (result.rows[0]) {
      if ("room_id" in result.rows[0]) {
        const roomIds = result.rows.map((row) => row.room_id);
        const [images, allPosts] = await Promise.all([
          roomImageService.retrieveAll(),
          postService.retrieveAll(),
        ]);
        let filteredPosts = allPosts
          .filter((post) => roomIds.includes(post.room_id))
          .map((post) => {
            const postImages = images.find(
              (img) => img.post_id === post.post_id
            );
            return {
              ...post,
              images: postImages ? postImages.images : [],
            };
          });
        return filteredPosts;
      } else {
        return result.rows;
      }
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const isRelatedToDbStruct = (message) => {
  for (const keyword of keywords) {
    if (new RegExp(keyword, "i").test(message)) {
      return true;
    }
  }
  return false;
};

const handleChat = async (message) => {
  const gpt = new G4F();
  try {
    const dbStructContent = fs.readFileSync(
      "/home/lehoang/graduation-project/server/src/utils/db-struct.txt",
      "utf-8"
    );
    let messages;
    if (isRelatedToDbStruct(message)) {
      messages = [
        { role: "user", content: dbStructContent },
        {
          role: "user",
          content:
            "chỉ cần trả về truy vấn (chỉ trả về room_id), không cần giải thích",
        },
        { role: "user", content: message },
      ];
    } else {
      messages = [
        { role: "user", content: "Trả lời bằng tiếng việt" },
        { role: "user", content: message },
      ];
    }

    const response = await gpt.chatCompletion(messages, {
      model: "gpt-4",
      prompt: "Trả lời ngắn gọn trong giới hạn 200 từ",
    });

    if (!isRelatedToDbStruct(message)) {
      const responseText = response.split(" ").slice(0, 200).join(" ");
      return { normal_message: responseText };
    } else {
      return {
        query: response,
      };
    }
  } catch (error) {
    console.error("Error generating chat response:", error);
  }
};
module.exports = { retrieveByUserQuery, handleChat };
