const moment = require('moment')
const online = []; // contain {socketId, userId} whose connecting to the socket

// Join user to chat
function joinOnline(socketId, userId) {
  const user = { socketId: socketId, userId: userId};
  online.push(user);
  console.log("Online")
  online.forEach(o=>{
    console.log("sjsjsjsjsjj jjjksakjcnakjfkfkjfh: "+o.socketId)
  })
  return user;
}

// Get current user
function getCurrentUser(id) {
  return online.find(user => user.userId === id);
}

// User leaves chat
function userLeave(id) {
  const index = online.findIndex(user => user.userId === id);

  if (index !== -1) {
    return online.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return online.filter(user => user.room === room);
}

module.exports = {
  joinOnline,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
