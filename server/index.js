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

let connectedUsers = {};

function addUser(userList, user) {
    let newList = Object.assign({}, userList);
    newList[user.email] = user;
    return newList;
}

function removeUser(userList, user) {
    let newList = Object.assign({}, userList);
    delete newList[user.email];
    return newList;
}

io.on('connection', socket => {
    console.log('Connected to socket id ', socket.id);

    socket.on('USER_CONNECTED', (user) => {
        connectedUsers = addUser(connectedUsers, user);

        io.emit('USER_CONNECTED', connectedUsers);
        socket.user = user;
        console.log('connectedUsers', connectedUsers);
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
        console.log(req.body.email, req.body.token);
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
