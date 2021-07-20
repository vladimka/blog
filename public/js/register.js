let loginInput = document.querySelector('input[name=login]');
let passwordInput = document.querySelector('input[name=password]');
let nameInput = document.querySelector('input[name=name]');
let errorText = document.querySelector('.form>.error');

document.querySelector('.form').onsubmit = async e => {
    e.preventDefault();
    errorText.innerHTML = '';

    let login = loginInput.value;
    let password = passwordInput.value;
    let name = nameInput.value;

    let response = await fetch(`/api/register?login=${login}&password=${password}&name=${name}`, { method : 'POST' });
    response = await response.json();

    loginInput.value = '';
    passwordInput.value = '';
    nameInput.value = '';

    if(response.error)
        return errorText.innerHTML = response.error;

    let token = await fetch(`/api/auth?login=${login}&password=${password}`, { method : 'POST' });
    token = await token.json();
    localStorage.setItem('userToken', token.token);
    location.href = '/';
}