const Koa = require('koa');
const http = require('http');
const cors = require('@koa/cors');
const socket = require('socket.io');

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server);

const SERVER_PORT = 8089;

io.on('connection', socket => {
    console.log('[IO] Connection => New Conncetion');

    socket.on('chat.message', data => {
        io.emit('chat.message', data);
    });

    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect');
    });
});

server.listen(SERVER_PORT, () => {
    console.log('[HTTP] Listen => Running');
});