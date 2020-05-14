/*
    NOTE: Intention was to share some of this on client and server.  Isn't the case right now
*/
const moment = require('moment');

//Description: Gets all active chat rooms.
//Params: socket
//Returns: ActiveChatRoomDTO[]
function getActiveChatRooms (socket) {
    console.log('getActiveChatRooms: socket.adapter.rooms: ', socket.adapter.rooms);
    console.log('getActiveChatRooms: socket.rooms: ', socket.rooms);
    let result = [];

    //socket.adapter.rooms is all rooms (not just this socket)
    //get all rooms, but keep out the default room (i.e., begins with '/chat... namespace')
    Object.keys(socket.adapter.rooms)
        .filter(x => !x.startsWith('/'))
        .forEach(roomKey => {
            //console.log('getActiveChatRooms: roomKey: ', roomKey);
            let thisRoom = socket.adapter.rooms[roomKey];
            //console.log('getActiveChatRooms: thisRoom:', thisRoom);
            let socketJoined = (Object.keys(thisRoom.sockets).findIndex(sid => (sid === socket.id)) >= 0);
            let joinedUsersCount = Object.keys(thisRoom.sockets).length;

            result.push(
                new ActiveChatRoomDTO(roomKey, socketJoined, joinedUsersCount)
            );
        });

    console.log('getActiveChatRooms: result: ', result);

    return result;
}

//Active/Available chat room info DTO.
class ActiveChatRoomDTO {
    constructor (roomName, isJoined, joinedUsersCount) {
        this.roomName = roomName;
        this.isJoined = isJoined;                   //determines if user (this socket is joined)
        this.joinedUsersCount = joinedUsersCount;   //total number of sockets joined into room
    }
}

//ChatMessageData (user or system generated) DTO.
class ChatMessageDataDTO {
    constructor (fromUserName, message) {
        this.fromName = fromUserName;
        this.time = moment().format('h:mm:ss a');
        this.message = message;
    }
}

//System generated ChatMessageDataDTO.
class SystemChatMessageDTO extends ChatMessageDataDTO {
    constructor (message) {
        super('System', message);
    }
}

//SendMessageRequest DTO.
class SendMessageRequestDTO {
    constructor (roomName, message){
        this.roomName = roomName;
        this.message = message;
    }
}

module.exports = {
    ChatMessageDataDTO,
    SystemChatMessageDTO,
    SendMessageRequestDTO,
    ActiveChatRoomDTO,
    getActiveChatRooms
};