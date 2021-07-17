let nameSpan = document.querySelector('#name');
let balanceSpan = document.querySelector('#balance');
let avatarBlock = document.querySelector('#avatar');
let user = {};

document.body.onload = async () => {
    if(!localStorage.getItem('userToken'))
        return location.href = '/login';

    let token = localStorage.getItem('userToken');
    let request = await fetch('/api/users/get?token=' + token);
    user = await request.json();
    console.log(user);

    nameSpan.innerHTML = user.name;
    balanceSpan.innerHTML = user.balance;
    avatarBlock.setAttribute('src', user.avatar || 'http://localhost/images/no_avatar.jpeg');
}