const express       = require("express"),
app           = express(),
bodyParser    = require("body-parser"),
mongoose      = require("mongoose"),
http = require('http').Server(app);
io = require('socket.io')(http),
chatroom = require('./controllers/chatroom')(io);
const authRoutes    = require("./routes/auth");

const PORT = process.env.PORT || '3001';

app.use(bodyParser.json());
app.use("/api/v1/users", authRoutes);

app.listen(PORT, function(){
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});

mongoose.connect("mongodb://localhost:27017/chat-app").then(() => {
    console.log("mongoose logged in");
    console.log("Node server started on port " + PORT);
});