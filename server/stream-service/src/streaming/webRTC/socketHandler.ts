import app from "../../config/express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as streams from './streams'

const httpServer = createServer(app);

const io: any = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', function (socket: any) {
    console.log('-- ' + socket.id + ' joined --');
    socket.emit('id', socket.id);

    socket.on('message', function (details: any) {
        var otherClient = io.sockets.connected[details.to];

        if (!otherClient) {
            return;
        }
        delete details.to;
        details.from = socket.id;
        otherClient.emit('message', details);
    });

    socket.on('readyToStream', function (options: any) {
        console.log('-- ' + socket.id + ' is ready to stream --');

        streams.addStream(socket.id, options.name);
    });

    socket.on('update', function (options: any) {
        streams.update(socket.id, options.name);
    });

    socket.on('disconnect', leave(socket));
    socket.on('leave', leave(socket));
});

function leave(socket: any) {
    console.log('-- ' + socket.id + ' left --');
    streams.removeStream(socket.id);
}

export default httpServer