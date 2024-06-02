exports.seed = function (knex) {
  // Deletes all existing entries
  return knex("services")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("services").insert([
        {
          service_id: 1,
          service_name: "VIP 1",
          price_per_day: 10000,
          price_per_week: 60000,
          price_per_month: 240000,
          advantages: "...",
          title_color: "#FF0000",
          auto_approval: true,
          prominent_badge: true,
          period: "1 week",
        },
        {
          service_id: 2,
          service_name: "VIP 2",
          price_per_day: 15000,
          price_per_week: 90000,
          price_per_month: 360000,
          advantages: "...",
          title_color: "#00FF00",
          auto_approval: false,
          prominent_badge: false,
          period: "1 week",
        },
        {
          service_id: 3,
          service_name: "VIP 3",
          price_per_day: 20000,
          price_per_week: 120000,
          price_per_month: 480000,
          advantages: "...",
          title_color: "#0000FF",
          auto_approval: true,
          prominent_badge: false,
          period: "1 week",
        },
        {
          service_id: 4,
          service_name: "VIP 4",
          price_per_day: 25000,
          price_per_week: 150000,
          price_per_month: 600000,
          advantages: "...",
          title_color: "#FFFF00",
          auto_approval: true,
          prominent_badge: true,
          period: "1 week",
        },
      ]);
    });
};
