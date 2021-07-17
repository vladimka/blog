let loginInput = document.querySelector('input[name=login]');
let passwordInput = document.querySelector('input[name=password]');
let errorText = document.querySelector('.form>.error');

document.querySelector('.form').onsubmit = async e => {
    e.preventDefault();
    errorText.innerHTML = '';

    let login = loginInput.value;
    let password = passwordInput.value;

    let token = await fetch(`/api/auth?login=${login}&password=${password}`, { method : 'POST' });

    token = await token.json();
    console.log(token);

    loginInput.value = '';
    passwordInput.value = '';

    if(token.error)
        return errorText.innerHTML = token.error;

    localStorage.setItem('userToken', token.token);
    location.href = '/';
}