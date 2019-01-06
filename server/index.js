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

io.on('connection', socket => {
    console.log('Connected to socket id ', socket.id);
})

app.post('/auth', (req, res) => {

    if (req.body.token === 'undefined') {
        client.hgetall(req.body.email, (err, obj) => {
            if (obj) {
                const connected = bcrypt.compareSync(req.body.password, obj.hash);
                if (connected) {
                    res.json({"token": obj.hash, "email": req.body.email});
                } else {
                    res.json({"error": "Password incorrect"});
                } 
            } else {
                const hash = bcrypt.hashSync(req.body.password);
                client.hmset(req.body.email, "hash", hash);
                res.json({"token": hash, "email": req.body.email});
            }
        });
    } else {
        if (req.body.email !== 'undefined' && req.body.token !== 'undefined') {
            client.hgetall(req.body.email, (err, obj) => {
                if (obj.hash === req.body.token) {
                    res.json({"token": obj.hash, "email": req.body.email});
                }
            });
        } else {
            res.json({"error": "Create user"});
        }
    }
})

app.post('/verify', (req, res, next) => {
    if (req.body.email !== 'undefined' && req.body.token !== 'undefined') {
        client.hgetall(req.body.email, (err, obj) => {
            if (obj.hash === req.body.token) {
                res.json({"token": obj.hash, "email": req.body.email});
            }
        });
    } else {
        res.json({"error": "Create user"});
    }
})

server.listen(PORT, () => {
    console.log('Connected to server on port ', PORT);
})
