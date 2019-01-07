const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const redis = require('redis')
const cors = require('cors')

const PORT = process.env.PORT || 3231
const client = redis.createClient()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

let connectedUsers = [];
let room = [];

io.on('connection', socket => {
    console.log('Connected to socket id ', socket.id);

    socket.on('USER_CONNECTED', (user) => {
        let socketUser = {
            email: user.email,
            socketId: socket.id
        };
        let exist = false;

        if (connectedUsers.length === 0) {
            connectedUsers.push(socketUser);
        }

        connectedUsers.forEach(connectedUser => {
            if (connectedUser.email === socketUser.email) {
                exist = true;
                return exist;
            }
        });

        if (!exist) {
            connectedUsers.push(socketUser);

        }

        io.emit('CONNECTED_USERS', connectedUsers);
        socket.user = user;
    });

    socket.on('USER_LOGOUT', (user) => {
        connectedUsers.forEach((connectedUser, index) => {
            if (connectedUser.email === user) {
                connectedUsers.splice(index, 1)
            }
        });

        io.emit('CONNECTED_USERS', connectedUsers);
        socket.user = null;
    });

    socket.on('CHAT_CREATED', (chat) => {
        let exist = false;

        if (room.length === 0) {
            room.push(chat.otherUser, chat.currentUser);
        }

        room.forEach(roomUser => {
            if (roomUser.email === chat.otherUser.email) {
                exist = true;
                return exist;
            }
        });

        if (!exist) {
            room.push(chat.otherUser);
        }

        const roomId = room[0].email + ':' + room[1].email;

        client.lrange(roomId, 0, -1, (err, messages) => {
            
            room.forEach(roomUser => {
                if (io.sockets.connected[roomUser.socketId]) {
                    io.sockets.connected[roomUser.socketId].emit('ROOM_CREATED', {room, messages, roomId});
                }
            });
        });
    });

    socket.on('MESSAGE_SENT', (message) => {
        const roomId = room[0].email + ':' + room[1].email;

        client.rpush(roomId, message.sender + ':' + message.message);

        client.lrange(roomId, 0, -1, (err, messages) => {
            room.forEach(roomUser => {
                if (io.sockets.connected[roomUser.socketId]) {
                    io.sockets.connected[roomUser.socketId].emit('MESSAGE_RECIEVED', {room, messages, roomId});
                }
            });
        });
    });
})

app.post('/auth', (req, res) => {

    if (req.body.token && req.body.email) {
        client.hgetall(req.body.email, (err, obj) => {
            if (obj) {
                if (obj.hash === req.body.token) {
                    res.json({"token": obj.hash, "email": req.body.email});
                } else {
                    res.json({"error": "Tocken or email incorrect"});
                }
            } else {
                const hash = bcrypt.hashSync(req.body.password);
                client.hmset(req.body.email, "hash", hash);
                res.json({"token": hash, "email": req.body.email});
            }
        });
    } 

    if (!req.body.token && req.body.email) {
        const hash = bcrypt.hashSync(req.body.password);
        client.hmset(req.body.email, "hash", hash);
        res.json({"token": hash, "email": req.body.email});
    }
})

app.post('/verify', (req, res, next) => {
    if (req.body.email !== 'undefined' && 
        req.body.token !== 'undefined' && 
        req.body.email !== null && 
        req.body.token !== null) {
        client.hgetall(req.body.email, (err, obj) => {
            if (obj) {
                if (obj.hash === req.body.token) {
                    res.json({"token": obj.hash, "email": req.body.email});
                } else {
                    res.json({"error": "Tocken or email incorrect"});
                }
            }
        });
    } else {
        res.json({"error": "Create user"});
    }
})

server.listen(PORT, () => {
    console.log('Connected to server on port ', PORT);
})
