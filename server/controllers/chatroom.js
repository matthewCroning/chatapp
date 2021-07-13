const rooms = {};

const room = {};
exports = module.exports = function(io){
    let previousId;


    io.sockets.on('connection', function (socket) {
        const safeJoin = currentId => {
            socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
        };

        socket.on('joinRoom', data => {
            safeJoin(data.roomId);
            socket.emit('room',rooms[data.roomId])
        });

        socket.on('getRooms', function(){
            io.emit('rooms', Object.keys(rooms));
        });

        socket.on('getRoom', data =>{
            console.log(data.roomId);
            console.log("get room = " + rooms[data.roomId]);
            socket.emit('room', rooms[data.roomId]);
        });

        socket.on('createRoom', data =>{
            safeJoin(data.roomId);
            var newRoom = {
                messages: [
                ]
              };
            rooms[data.roomId] = newRoom;
            console.log(data.roomId);
            console.log(newRoom);
            io.emit('rooms', Object.keys(rooms));
        })

        socket.on('sendMessage', data=>{
            console.log("sending Message");
            rooms[data.roomId].messages.push(data.message);
            console.log(rooms[data.roomId]);
            socket.emit('room', rooms[data.roomId]);
        })

        io.emit('rooms', Object.keys(rooms));
        console.log(`Socket ${socket.id} has connected`);
    });
  }