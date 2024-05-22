let tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe.user;

async function collectBeer() {
    let response = await fetch('/collect_beer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            telegram_id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username
        })
    });
    let result = await response.json();
    document.getElementById('beer-status').innerText = `Beer amount: ${result.beer_amount}`;
    document.getElementById('error-message').innerText = result.message;
}

document.getElementById('collect-beer').addEventListener('click', collectBeer);

async function getUserInfo() {
    let response = await fetch('/user_info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            telegram_id: user.id
        })
    });
    let result = await response.json();
    document.getElementById('beer-status').innerText = `Beer amount: ${result.beer_amount}`;
    document.getElementById('error-message').innerText = result.message;
}

getUserInfo();

let usercard = document.getElementById("usercard");
let profName = document.createElement('p');
profName.innerText = `${user.first_name} ${user.last_name} @${user.username} (${user.language_code})`;
usercard.appendChild(profName);

let userid = document.createElement('p');
userid.innerText = `ID: ${user.id}`;
usercard.appendChild(userid);

tg.onEvent('themeChanged', function() {
    document.body.style.color = tg.themeParams.text_color || 'black';
    document.body.style.backgroundColor = tg.themeParams.bg_color || 'white';
});
