//see https://www.npmjs.com/package/socket.io
const registerDiv = document.getElementById('RegisterDiv');
const regForm = document.getElementById('RegisterForm');
const userNameInput = document.getElementById('UsernameInput');
const chatsDiv = document.getElementById('ChatsDiv');
const activeRoomsDiv = document.getElementById('ActiveRoomsDiv');
const activeRoomDiv = document.getElementById('ActiveRoomDiv');
//const activeRoomName = document.getElementById('ActiveRoomName');
const activeRoomMessagesDiv = document.getElementById('ActiveRoomMessagesDiv');
const sendRoomMessageForm = document.getElementById('SendRoomMessageForm');

const socket = io('/chats-namespace');

var activeRoomName;

//RegisterForm (start) submit handler
regForm.addEventListener('submit', e => {
    e.preventDefault();
  
    //emit to server
    socket.emit('setRegisteredUser', UsernameInput.value);
  
    //$("RegisterDiv").hide();
    //$("ActiveRoomsDiv").show();
    registerDiv.classList.add('hide');
    chatsDiv.classList.remove('hide');
});

//Active Room link click event handler
$('.active-room-link').on('click', (e) => {
    e.preventDefault();

    const roomName = e.target.dataset.roomname;

    //emit to server
    socket.emit('joinRoom', roomName);

    //NOTE: Could listen for the joinRoom complete, but for now just do this.
    //show / reset active room content
    activeRoomDiv.classList.remove('hide');
    //Update name
    activeRoomName = roomName;
    //clear messages
    activeRoomMessagesDiv.innerHTML = '';

    //deactivate all links and activate this one (could just deactivate active one, but not sure how to target)
    const allLinks = document.querySelectorAll('.active-room-link');
    for (let link of allLinks) {
        link.classList.remove('active');
    }
    e.target.classList.add('active');
});

//Active Room: SendRoomMessageForm submit handler
sendRoomMessageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('sendRoomMessageForm submit fired');
    const messageInput = e.target.elements.ChatMessageInput;

    const requestPayload = {
        roomName: activeRoomName,
        message: messageInput.value
    };
    
    //emit to server
    socket.emit('chatRoomMessage', requestPayload);

    //clear message input
    messageInput.value = '';
});

//Message from server
socket.on('chatRoomMessage', messageData => {
    console.log('chatRoomMessage received: ', messageData);
    outputMessage(messageData);
});

//Output message to DOMß
function outputMessage(messageData) {
    const div = document.createElement('div');
    
    div.classList.add('message');
    div.innerHTML = `<span class="message-source">${messageData.fromName} @ ${messageData.time}:</span> <span class="message-body">${messageData.message}</span>`;
    
    const messagesDiv = document.querySelector('.chat-messages');
    messagesDiv.appendChild(div);

    //scroll down in messages control
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

//Active rooms change notification from server
socket.on('activeChatRoomsChange', (data) => {
    console.log('activeChatRoomsChange received: ', data);
    
    //for now since the list of rooms is static, going to go through those ui controls to update each
    //const activeRoomLinks = document.getElementsByClassName('active-room-link');
    const activeRoomLinks = activeRoomsDiv.querySelectorAll(".active-room-link");

    for (let link of activeRoomLinks) {
        let joinedUsersCount = 0;
        let isJoined = false;
        
        const activeRoomFromServer = data.find(x => (x.roomName == link.dataset.roomname));
        if (activeRoomFromServer) {
            isJoined = activeRoomFromServer.isJoined;
            joinedUsersCount = activeRoomFromServer.joinedUsersCount;
        }
    
        //console.log(`room: ${link.dataset.roomname}, isJoined: ${isJoined},joinedUsersCount: ${joinedUsersCount}`);

        //update joined users count
        let usersCountControl = link.querySelector(".badge");
        usersCountControl.innerHTML = `${joinedUsersCount}`;
    }
});

// //Room Join button click event handler
// $('.joinLeaveRoomButton').on('click', (e) => {
//     e.preventDefault();

//     const requestPayload = {
//         roomName: e.target.dataset.roomname,
//         username: userNameInput.value
//     };

//     const isJoining = (e.target.dataset.inroom === "false");
    
//     if (isJoining) {
//         //emit to server
//         socket.emit('joinRoom', requestPayload);
//         //toggle button attributes
//         e.target.innerText = "Leave";
//         e.target.dataset.inroom = "true";
//     } else {
//         //emit to server
//         socket.emit('leaveRoom', requestPayload);
//         //toggle button attributes
//         e.target.innerText = 'Join';
//         e.target.dataset.inroom = "false";
//     }
// });