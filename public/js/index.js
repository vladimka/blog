function getUserToken(){
    let token = localStorage.getItem('userToken');

    if(token == null || token == '')
        return location.href = '/login';

    return token;
}

function renderUserInfo(){
    document.querySelector('#balance').innerHTML = userInfo.balance.toFixed(3);
    document.querySelector('#ipc').innerHTML = userInfo.ipc.toFixed(3);
    document.querySelector('#ips').innerHTML = userInfo.ips.toFixed(3);
}

const socket = io();
const userToken = getUserToken();
let userInfo;

socket.emit('auth', { token : userToken })
socket.on('info', data => {
    userInfo = data;
    renderUserInfo();
});

setInterval(() => socket.emit('getInfo'), 100);