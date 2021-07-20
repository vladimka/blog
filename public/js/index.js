let nameBlocks = document.querySelectorAll('.name');
let balanceSpan = document.querySelector('#balance');
let avatarBlock = document.querySelector('#avatar');
let addPostBtn = document.querySelector('.addPost>button');
let addPostInput = document.querySelector('#postBody');
let postsBlock = document.querySelector('.posts');
let user = {};
let posts = [];

document.body.onload = async () => {
    if(!localStorage.getItem('userToken') || localStorage.getItem('userToken') == '')
        return location.href = '/login';

    let token = localStorage.getItem('userToken');
    let request = await fetch('/api/users/get?token=' + token);
    user = await request.json();
    console.log(user);

    nameBlocks.forEach(block => block.innerHTML = user.name);
    balanceSpan.innerHTML = user.balance;
    avatarBlock.setAttribute('src', user.avatarUrl == '' ? 'http://localhost/images/no_avatar.jpeg' : user.avatarUrl);

    let posts = await fetch(`/api/posts/get?owner_id=${user.id}&token=${token}`);
    posts = [await posts.json()];
    console.log(posts);

    posts.forEach(async post => {
        postsBlock.innerHTML += `
            <div class="post block">
                <p>${user.name}</p>
                <p>${post.body}</p>
            </div>
        `;
    });
}

function logout(){
    localStorage.setItem('userToken', '');
    location.href = '/login';
}

addPostBtn.onclick = async () => {
    let postText = addPostInput.value;
    addPostInput.value = '';
}