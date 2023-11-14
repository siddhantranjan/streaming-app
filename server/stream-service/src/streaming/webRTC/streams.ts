let streamList: StreamInterface[] = [];

interface StreamInterface {
    id: any;
    name: any
}

class Stream implements StreamInterface {
    id: any;
    name: any;

    constructor(id: any, name: any) {
        this.id = id;
        this.name = name;
    }
}

export const addStream = (id: any, name: any) => {
    var stream = new Stream(id, name);
    streamList.push(stream);
}

export const removeStream = (id: any) => {
    let index = 0;
    while (index < streamList.length && streamList[index].id != id) {
        index++;
    }
    streamList.splice(index, 1);
}

export const update = (id: any, name: any) => {
    let stream: any = streamList.find(function (element, i, array) {
        return element.id == id;
    });
    stream.name = name;
}

export const getStreams = () => {
    return streamList;
}

