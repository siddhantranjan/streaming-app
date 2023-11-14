import * as wss from './wss'

const config = {
    peerConnectionConfig: {
        iceServers: [
            { "url": "stun:stun.l.google.com:19302" }
        ]
    },
    mediaConstraints: {
        audio: true,
        video: true,
    }
}

let localStream;
let peerDatabase = {};

const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video')

const openMediaDevices = async (constraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
}

export const getLocalPreviewAndInitPeerConnection = async () => {
    try {
        const stream = await openMediaDevices(config.mediaConstraints);
        console.log('Got MediaStream:', stream);
        localStream = stream;
        showLocalVideoPreview(stream)
    } catch (error) {
        console.error('Error accessing media devices.', error);
    }
}

export const addPeer = (connUserSocketId) => {
    const pc = new RTCPeerConnection(config.peerConnectionConfig);
    pc.onicecandidate = (event) => {
        if (event.candidate) {
            wss.send('candidate', connUserSocketId, {
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            })
        }
    };

    pc.onaddstream = (event) => {
        remoteVideo.srcObject = event.stream;
    }

    pc.onremovestream = (event) => {
        remoteVideo.src = '';
    }

    pc.oniceconnectionstatechange = (event) => {
        switch((event.srcElement || event.target).iceConnectionState){
            case 'disconnected':
                console.log('remove remote vieeo element');
                break;
            default:
                break;
        }
    }

    const peer =  {pc, remoteVideo}

    peerDatabase[connUserSocketId] = peer;
    return peer;
}

export const handleMessage = (data) => {
    const type = data.type
    const from = data.from
    const pc = (peerDatabase[from] || addPeer(from)).pc;

    console.log('received ', type, ' from ', from);

    switch(type) {
        case 'init':
            toggleLocalStream(pc);
            offer(from);
            break;
        case 'offer':
            pc.setRemoteDescription(new RTCSessionDescription(data.payload), () => {}, (error) => {
                console.log(error)
            });
            answer(from);
            break;
        case 'answer':
            pc.setRemoteDescription(new RTCSessionDescription(data.payload), () => {}, (error) => {
                console.log(error)
            });
            break;
        case 'candidate':
            if(pc.remoteDescription) {
                pc.addIceCandidate(new RTCIceCandidate({
                    sdpMLineIndex: data.payload.label,
                    sdpMid: data.payload.id,
                    candidate: data.payload.candidate
                }), () => {}, (error) => {
                    console.log(error)
                })
            }
            break;
        default:
            break;
    }
}

export const peerInit = (remoteId) => {
    peerDatabase[remoteId] ?? addPeer(remoteId);
    wss.send('init', remoteId, null);
}

export const peerRenegotiate = (remoteId) => {
    offer(remoteId);
}

const toggleLocalStream = (pc) => {
    if(localStream) {
        (!!pc.getLocalStreams().length) ? pc.removeStream(localStream) : pc.addTrack(localStream);
    }
}

const offer = (remoteId) => {
    const pc = peerDatabase[remoteId].pc;
    pc.createOffer((sessionDescription) => {
        pc.setLocalDescription(sessionDescription);
        wss.send('offer', remoteId, sessionDescription);
    }, (error) => {
        console.log('Error Occurred during offer: ', error)
    })
}

const answer = (remoteId) => {
    const pc = peerDatabase[remoteId].pc;
    pc.createAnswer((sessionDescription) => {
        pc.setLocalDescription(sessionDescription);
        wss.send('answer', remoteId, sessionDescription);
    }, (error) => {
        console.log('Error Occurred during answer: ', error)
    })
}

const showLocalVideoPreview = (stream) => {
    console.log('stream: ', stream)
    localVideo.srcObject = stream;
}

