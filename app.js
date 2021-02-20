const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const terminalLink = require('terminal-link');

const link = terminalLink('http://localhost:3000', 'http://localhost:3000');

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log(`listening on ${link}`);
});
