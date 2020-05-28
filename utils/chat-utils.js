const moment = require('moment')
var online = []
// Join user to chat
function joinOnline(socketId, userId) {
  const user = { socketId: socketId, userId: userId};
  let index = online.findIndex(userr=> userr.userId == userId)
  if (index<0)
    {
      online.push(user);
    }
  else{
    online.splice(index, 1)
    online.push(user)
    
  }
  console.log("Online")
  online.forEach(o=>{
    console.log("user: "+o.userId+"\nsocket: "+o.socketId)
  })
}

// Get current user
function getReceiverSocket(id) {
  let index = online.findIndex(o => o.userId==id)
  if (index>=0)
    return online[index].socketId
  else return false
}

// User leaves chat
function userLeave(id) {
  const index = online.findIndex(o => o.socketId === id);

  if (index != -1) {
    online.splice(index, 1);
  }
}



module.exports = {
  joinOnline,
  getReceiverSocket,
  userLeave
};
