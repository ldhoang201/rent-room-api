exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { user_name: 'user1', email: 'user1@example.com', hashed_password: '$2b$10$1szwGaLzCJGw5Cr0gA5.Ae/cxvId7pJWRYVvs0SWl1.MgZ2n2kMfW', phone: '123456789', role_id: 2 },
        { user_name: 'user2', email: 'user2@example.com', hashed_password: '$2b$10$1szwGaLzCJGw5Cr0gA5.Ae/cxvId7pJWRYVvs0SWl1.MgZ2n2kMfW', phone: '123456789', role_id: 3 },
        { user_name: 'user3', email: 'user3@example.com', hashed_password: '$2b$10$1szwGaLzCJGw5Cr0gA5.Ae/cxvId7pJWRYVvs0SWl1.MgZ2n2kMfW', phone: '123456789', role_id: 3 }
      ]);
    });
};
