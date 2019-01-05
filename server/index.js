const app = require('http').createServer()
const io = require('socket.io')(app)

const PORT = process.env.PORT || 3231

io.on('connection', socket => {
    console.log('Connected to socket id ', socket.id);
})

app.listen(PORT, () => {
    console.log('Connected to server on port ', PORT);
})
