import io from 'socket.io-client';
import * as webRTCHandler from './webRTCHandler'


const SERVER = 'http://localhost:3004';

let socket = null;
let localId = null;

export const connectWithSocketIoServer = () => {
    socket = io(SERVER);
    socket.on('connect', () => {
        console.log('Successfullly Connected with socketIO');
        console.log('Socket ID: ', socket.id)
    }, (error) => console.log('Error Occurred while connecting to socket server: ',error))

    socket.on('message', (data) => {
        webRTCHandler.handleMessage(data);
    })

}

export const send = (type, to, payload) => {

    console.log('sending ', type + ' to ' + to);
    const data = {to, type, payload}

    socket.emit('message', data)
}

