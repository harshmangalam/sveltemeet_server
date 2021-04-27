const users = [];

function addUser(data) {
  users.push(data);
  return data;
}

function removeUser(socketId) {
  let findIndex = users.findIndex((u) => u.socketId === socketId);
  if (findIndex === -1) return false;
  users.splice(findIndex, 1);
  return true;
}

function fetchUsers() {
  return users;
}

function fetchUser(socketId) {
  return users.find((u) => u.socketId === socketId);
}

function filteredUsers(socketId) {
  return users.filter((u) => u.socketId !== socketId);
}

module.exports = {
  removeUser,
  fetchUser,
  fetchUsers,
  addUser,
  filteredUsers
};
