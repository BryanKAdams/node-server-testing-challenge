const db = require("../dbConfig");

module.exports = {
  getUsers,
  getUserByID,
  getUserByUsername,
  addUser,
  updateUser,
  getUserByDepartment
};

function getUsers() {
  return db("users");
}

function getUserByID(id) {
  return db("users")
    .where({ id })
    .first();
}
function getUserByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}
function getUserByDepartment(department) {
  return db("users")
    .where({ department })
}

function updateUser(user) {
  return db("users")
    .where({ id: user.id })
    .update(user)
    .then(() => {
      return getUserByID(user.id);
    });
}
function addUser(user) {
  return db("users").insert(user);
}
