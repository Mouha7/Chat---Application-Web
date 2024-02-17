let user = [
    {
        id_user: 0, // (int, PK)
        username: "test",  // (string)
        email: "devops@gmail.com", // (string)
        password: "p", // (string)
        number: "784590654", // (string)
        user_photo: "./img/product1.jpg", // (string)
        last_login: "07/01/2024 16:01",
        state: false, // (bool)
        archive: false, // (bool)
        blocked_user: [], // (array)
        list_friend: [1, 2, 3] // (array)
    },
    {
        id_user: 1, // (int, PK)
        username: "Aliou",  // (string)
        email: "aliou@gmail.com", // (string)
        password: "p", // (string)
        number: "784590654", // (string)
        user_photo: "./img/product5.jpg", // (string)
        last_login: "07/01/2024 16:03",
        state: false, // (bool)
        archive: false, // (bool)
        blocked_user: [], // (array)
        list_friend: [0] // (array)
    },
    {
        id_user: 2, // (int, PK)
        username: "Mouhamed Sow",  // (string)
        email: "mouha@gmail.com", // (string)
        password: "p", // (string)
        number: "784590654", // (string)
        user_photo: "./img/product2.jpg", // (string)
        last_login: "07/01/2024 16:10",
        state: false, // (bool)
        archive: false, // (bool)
        blocked_user: [], // (array)
        list_friend: [0] // (array)
    },
    {
        id_user: 3, // (int, PK)
        username: "Binta",  // (string)
        email: "binta@gmail.com", // (string)
        password: "p", // (string)
        number: "776589340", // (string)
        user_photo: "./img/product2.jpg", // (string)
        last_login: "07/01/2024 16:10",
        state: false, // (bool)
        archive: false, // (bool)
        blocked_user: [], // (array)
        list_friend: [0] // (array)
    },
];

let message = [
    {
        id_msg: 0, // (int, PK)
        content: "Bonjour, comment se déroule ton projet ?", // (string)
        date: '10/02/2023', // (datetime)
        hours: '10:30', // (datetime)
        id_sender: 1, // (int, FK references User.id_user)
        id_receiver: 0, // (int, FK references User.id_user)
        seen: true, // (bool)
        full_date: function () {
            return this.date + " " + this.hours
        }
    },
    {
        id_msg: 1, // (int, PK)
        content: "Bonjour, le projet avance douce, j’espère faire du bon travail.", // (string)
        date: '10/02/2023', // (datetime)
        hours: '10:35', // (datetime)
        id_sender: 0, // (int, FK references User.id_user)
        id_receiver: 1, // (int, FK references User.id_user)
        seen: false, // (bool)
        full_date: function () {
            return this.date + " " + this.hours
        }
    },
    {
        id_msg: 2, // (int, PK)
        content: "Bonsoir, peux-tu m'aider ton projet ?", // (string)
        date: '10/02/2023', // (datetime)
        hours: '20:30', // (datetime)
        id_sender: 2, // (int, FK references User.id_user)
        id_receiver: 0, // (int, FK references User.id_user)
        seen: false, // (bool)
        full_date: function () {
            return this.date + " " + this.hours
        }
    },
];

let group = [
    {
        id_group: 0, //(int, PK)
        group_name: 'L2 - GLRS', // (string)
        created_at: '01/01/2023', // (datetime)
        group_photo: './img/product4.jpg', // (string)
        id_membres: [0, 2], // (array)
        id_admin: 0 // (int, FK references User.id_user)
    }
];

let user_group = [
    {
        id_user_group: 0, // (int, PK)
        role: 'Admin', // (string)
        date_joined: '13/09/2022', // (datetime)
        id_user: 0, // (int, FK references User.id_user)
        id_group: 0 // (int, FK references Group.id_group)
    }
];

let connected = 0; // À supprimer
let friend; // À Supprimer

/* Au chargement de la page */
const container = document.querySelector('.container');
const login = document.querySelector('.login');
// window.onload = () => {
//     login.classList.remove('hidden');
//     container.classList.add('hidden');
// }
/**** 
*Fin* 
*****/


/* Session Connection & Déconnexion */
const formSignin = document.querySelector('.login form');
const nameInput = document.querySelector('#name');
const passwordInput = document.querySelector('#password');
const errorName = document.querySelector('.error_name');
const errorPassword = document.querySelector('.error_password');
const logout = document.querySelector('#logout');

// Gère les données saisies
nameInput.addEventListener('blur', () => {
    const exists = user.some(value => value.username === nameInput.value);
    if (nameInput.value === '') {
        errorName.classList.remove('show');
    }
    else if (!exists) {
        errorName.classList.add('show');
    }
    else {
        errorName.classList.remove('show');
    }
});

passwordInput.addEventListener('blur', () => {
    const exists = user.some(value => value.password === passwordInput.value);

    if (passwordInput.value === '') {
        errorPassword.classList.remove('show');
    }
    else if (!exists) {
        errorPassword.classList.add('show');
    }
    else {
        errorPassword.classList.remove('show');
    }
});

// Gère La Connexion et La Déconnexion 
formSignin.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = nameInput.value;
    let password = passwordInput.value;

    for (let i = 0; i < user.length; i++) {
        if (name === user[i].username && password === user[i].password) {
            nameInput.value = '';
            passwordInput.value = '';
            connected = user[i].id_user;
            let test = connectUser(connected);
            if (test !== null) {
                login.classList.add('hidden');
                container.classList.remove('hidden');
            }
        }
    }
})

logout.addEventListener('click', () => {
    login.classList.remove('hidden');
    container.classList.add('hidden');
    printUserMsg(connected);
    return disconnectUser(connected);
})

// Fonction pour connecter l'utilisateur
function connectUser(userId) {
    if (!sessionStorage.getItem('connectedUsers')) {
        sessionStorage.setItem('connectedUsers', JSON.stringify([]));
    }
    let connectedUsers = JSON.parse(sessionStorage.getItem('connectedUsers'));
    if (!connectedUsers.includes(userId)) {
        connectedUsers.push(userId);
        sessionStorage.setItem('connectedUsers', JSON.stringify(connectedUsers));
        console.log(`Utilisateur ${userId} connecté.`);
    } else {
        alert(`L'utilisateur ${userId} est déjà connecté.`);
        return null;
    }
}

// Fonction pour déconnecter l'utilisateur
function disconnectUser(userId) {
    let connectedUsers = JSON.parse(sessionStorage.getItem('connectedUsers'));
    if (connectedUsers.includes(userId)) {
        connectedUsers = connectedUsers.filter(user => user !== userId);
        sessionStorage.setItem('connectedUsers', JSON.stringify(connectedUsers));
        console.log(`Utilisateur ${userId} déconnecté.`);
    } else {
        console.log(`L'utilisateur ${userId} n'est pas connecté.`);
    }
}
/**** 
*Fin* 
*****/

/* Session Globale */
const heroChat = document.querySelector('.hero-chat');
const heroMessage = document.querySelector('.hero-message');
const heroNav = document.querySelector('.hero-nav');
const searchBtn = document.querySelector('#search');
const navHead = document.querySelector('.nav-head');
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
/**** 
*Fin* 
*****/

/* Session Message */
const h1 = document.querySelector('.nav-friend h1');
const navAllUser = document.querySelector('.nav-all-user');
const textareaMsg = document.querySelector('.hero-input-message #message');
const sendMsg = document.querySelector('.send-msg');
const popup = document.querySelector('.popup');
const newDiscuss = document.querySelector('.open-new-discuss');
const popupClose = document.querySelector('.popup-close');
const popupBox = document.querySelector('.popup-box');

function getGroupMsgByUser(connected) {
    let msg_groupes = [];
    user.forEach(key => {
        if (key.id_user != connected) {
            message.forEach(value => {
                if ((connected === value.id_sender && key.id_user === value.id_receiver) || (connected === value.id_receiver && key.id_user === value.id_sender)) {
                    msg_groupes.push(value);
                }
            });
        }
    })
    return msg_groupes;
}

function filtreUserId(connected) {
    let array_msg_users = getGroupMsgByUser(connected);
    let sender = [...new Set(array_msg_users.map(value => value.id_sender))];
    let receiver = [...new Set(array_msg_users.map(value => value.id_receiver))];
    return [...new Set([...sender, ...receiver])].sort();
}

function getAllIdFriendUser(connected) {
    let array_id = filtreUserId(connected);
    let new_array = [];
    array_id.forEach(id => {
        if (id !== connected) {
            new_array.push(id);
        }
    })
    return new_array;
}

//Fonction Pour retourner les amis d'un user avec filtre sur l'archive et blocage
function getGroupUserFriends(connected) {
    let array_id = getAllIdFriendUser(connected);
    let array_users = [];
    array_id.forEach(id => {
        if (!getUser(id).archive && !user[connected].blocked_user.includes(id)) {
            array_users.push(getUser(id));
        }
    });
    return array_users
}

function getUser(id) {
    for (let i = 0; i < user.length; i++) {
        if (user[i].id_user === id) {
            return user[i];
        }
    }
    return null;
}

function getLastMsg(connected, friend) {
    let stock;
    for (let i = 0; i < message.length; i++) {
        if ((message[i].id_sender === connected && message[i].id_receiver === friend) || (message[i].id_sender === friend && message[i].id_receiver === connected)) {
            stock = message[i];
        }
    }
    return stock;
}

// Join Un User avec son dernier message 
function joinUserLastMsg(connected) {
    let array_id = getAllIdFriendUser(connected);
    let array_users = getGroupUserFriends(connected);
    for (let i = 0; i < array_users.length; i++) {
        for (let j = 0; j < array_id.length; j++) {
            if (array_users[i].id_user === array_id[j]) {
                array_users[i].last_message = getLastMsg(connected, array_id[j]);
            }
        }
    }
    return array_users;
}

function getUserAfterJoin(connected, friendId) {
    let array_users = joinUserLastMsg(connected);
    for (let i = 0; i < array_users.length; i++) {
        if (array_users[i].id_user === friendId) {
            return array_users[i];
        }
    }
    return null;
}

// Vérifié l'affichage avec les dates du dernier message et envoyé null s'il n'a pas de message
function printUserMsg(connected) {
    navAllUser.innerHTML = '';
    h1.innerHTML = 'Messages';
    let array_users_merge = joinUserLastMsg(connected);
    for (let i = array_users_merge.length - 1; i >= 0; i--) {
        let key = array_users_merge[i];
        if (key.last_message.id_receiver === connected && !(key.last_message.seen)) {
            navAllUser.innerHTML += `
                <div class="nav-user" onclick="detailsUser(${connected}, ${key.id_user})">
                    <img class="img" src="${key.user_photo}" >
                    <div class="nav-username">
                        <div class="box-one">
                            <h3 class="name">${key.username}</h3>
                            <p class="content">${key.last_message.content}</p>
                        </div>
                        <div class="box-two">
                            <span "date">${key.last_message.hours}</span>
                            <span class="notif"></span>
                        </div>
                    </div>
                </div>
            `;
        }
        else {
            navAllUser.innerHTML += `
                <div class="nav-user" onclick="detailsUser(${connected}, ${key.id_user})">
                    <img class="img" src="${key.user_photo}" >
                    <div class="nav-username">
                        <div class="box-one">
                            <h3 class="name">${key.username}</h3>
                            <p class="content">${key.last_message.content}</p>
                        </div>
                        <div class="box-two">
                            <span "date">${key.last_message.hours}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}
printUserMsg(connected); // À supprimer par la suit

// Supprimer une conversation
function deletedAllMsg(connected, friendId) {
    message = message.filter(msg => !((msg.id_sender === connected && msg.id_receiver === friendId) || (msg.id_sender === friendId && msg.id_receiver === connected)));
    heroChat.classList.add('hidden');
    updateMsgAfterPop();
    printUserMsg(connected);
}

function detailsUser(connected, friendId) {
    friend = friendId;
    getInterfaceMsg(connected, friendId);
    getDetailsUser(connected, friendId);
    getUpdateMsgSeen(connected, friendId);
    scrollToBottom();
}

function getUpdateMsgSeen(connected, friendId) {
    let oneUser = getUserAfterJoin(connected, friendId);
    for (let i = 0; i < message.length; i++) {
        if (message[i].id_msg === oneUser.last_message.id_msg) {
            message[i].seen = true;
            return printUserMsg(connected);
        }
    }
    return null;
}

function getInterfaceMsg(connected, friendId) {
    heroMessage.innerHTML = '';
    heroChat.classList.remove('hidden');
    let userConnected = getUser(friendId);
    message.forEach(msg => {
        if (userConnected.state) {
            if ((msg.id_sender === connected && msg.id_receiver === friendId)) {
                heroMessage.innerHTML += `
                    <div class="send">
                        <p>${msg.content} <span>${msg.hours}<span class="material-symbols-outlined">done_all</span></span></p>
                    </div>
                `;
            }
            else if (msg.id_sender === friendId && msg.id_receiver === connected) {
                heroMessage.innerHTML += `
                    <div class="receive">
                        <p>${msg.content} <span>${msg.hours}<span class="material-symbols-outlined">done_all</span></span></p>
                    </div>
                `;
            }
        }
        else {
            if (getDateFusion(msg.full_date(), userConnected.last_login)) {
                if ((msg.id_sender === connected && msg.id_receiver === friendId)) {
                    heroMessage.innerHTML += `
                        <div class="send">
                            <p>${msg.content} <span>${msg.hours}<span class="material-symbols-outlined">done</span></span></p>
                        </div>
                    `;
                }
                else if (msg.id_sender === friendId && msg.id_receiver === connected) {
                    heroMessage.innerHTML += `
                        <div class="receive">
                            <p>${msg.content} <span>${msg.hours}<span class="material-symbols-outlined">done</span></span></p>
                        </div>
                    `;
                }
            }
            else {
                if ((msg.id_sender === connected && msg.id_receiver === friendId)) {
                    heroMessage.innerHTML += `
                        <div class="send">
                            <p>${msg.content} <span>${msg.hours}<span class="material-symbols-outlined">done_all</span></span></p>
                        </div>
                    `;
                }
                else if (msg.id_sender === friendId && msg.id_receiver === connected) {
                    heroMessage.innerHTML += `
                        <div class="receive">
                            <p>${msg.content} <span>${msg.hours}<span class="material-symbols-outlined">done_all</span></span></p>
                        </div>
                    `;
                }
            }
        }
    });
}

function updateMsgAfterPop() {
    for (let i = 0; i < message.length; i++) {
        message[i].id_msg = i;
    }
}

// Archiver une conversation
function archiver(connected, friendId) {
    for (let i = 0; i < user.length; i++) {
        if (user[i].id_user === friendId) {
            user[i].archive = true;
        }
    }
    heroChat.classList.add('hidden');
    printUserMsg(connected);
}

// Bloquer un utilisateur
function blockUser(connected, friendId) {
    for (let i = 0; i < user.length; i++) {
        if (user[i].id_user === connected) {
            user[i].blocked_user.push(friendId);
        }
    }
    heroChat.classList.add('hidden');
    printUserMsg(connected);
}

// Supprimer un utilisateur
function deletedUser(connected, friendId) {
    user = user.filter(value => value.id_user != friendId);
    for (let i = 0; i < user.length; i++) {
        user[i].id_user = i;
    }
    heroChat.classList.add('hidden');
    printUserMsg(connected);
}

// Fonction  pour afficher les infos du user
function getDetailsUser(connected, friendId) {
    heroNav.innerHTML = '';
    let msgFriend = getUser(friendId);
    if (msgFriend.state) {
        heroNav.innerHTML = `
            <div class="nav-user">
                <img src="${msgFriend.user_photo}">
                <div class="nav-username">
                    <div class="box-user">
                        <h3 class="name">${msgFriend.username}</h3>
                        <p class="status">Connecté</p>
                    </div>
                    <div class="box-plus">
                        <span class="material-symbols-outlined" title="Supprimer conversation" onclick="deletedAllMsg(${connected},${msgFriend.id_user})">delete_forever</span>
                        <span class="material-symbols-outlined" title="Archiver conversation" onclick="archiver(${connected},${msgFriend.id_user})">archive</span>
                        <span class="material-symbols-outlined" title="Bloquer utilisateur" onclick="blockUser(${connected},${msgFriend.id_user})">block</span>
                        <span class="material-symbols-outlined" title="Supprimer utilisateur" onclick="deletedUser(${connected},${user.id_user})">person_remove</span>
                    </div>
                </div>
            </div>
        `;
    }
    else {
        heroNav.innerHTML = `
            <div class="nav-user">
                <img src="${msgFriend.user_photo}">
                <div class="nav-username">
                    <div class="box-user">
                        <h3 class="name">${msgFriend.username}</h3>
                        <p class="status">Déconnecté</p>
                    </div>
                    <div class="box-plus">
                        <span class="material-symbols-outlined" title="Supprimer conversation" onclick="deletedAllMsg(${connected},${msgFriend.id_user})">delete_forever</span>
                        <span class="material-symbols-outlined" title="Archiver conversation" onclick="archiver(${connected},${msgFriend.id_user})">archive</span>
                        <span class="material-symbols-outlined" title="Bloquer utilisateur" onclick="blockUser(${connected},${msgFriend.id_user})">block</span>
                        <span class="material-symbols-outlined" title="Supprimer utilisateur" onclick="deletedUser(${connected},${msgFriend.id_user})">person_remove</span>
                    </div>
                </div>
            </div>
        `;
    }
}

function getDateFusion(dateMsg, dateUser) {
    const dateMessage = new Date(dateMsg);
    const dateConnectionUser = new Date(dateUser);
    return dateMessage > dateConnectionUser ? true : false;
}

sendMsg.addEventListener('click', sendMsgUser);

textareaMsg.addEventListener('keyup', (e) => {
    textareaMsg.style.height = '45px';
    let scrollHeight = e.target.scrollHeight;
    textareaMsg.style.height = `${scrollHeight}px`;
    // if(e.keyCode === 13) {
    //     sendMsgUser(connected);
    // }
})

// Obtenir la date
function currentDate() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function currentHours() {
    const date = new Date();
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// Fonction pour envoie (supprimer connected = 0 et utiliser localStorage)
function sendMsgUser() {
    let msgInput = textareaMsg.value.trim();
    textareaMsg.value = '';
    textareaMsg.style.height = '45px';
    if (!msgInput) {
        return;
    }
    message.push({
        id_msg: message.length + 1,
        content: msgInput,
        date: currentDate(),
        hours: currentHours(),
        id_sender: connected,
        id_receiver: friend,
        seen: false,
        full_date: function () {
            return this.date + " " + this.hours
        }
    });
    detailsUser(connected, friend);
    printUserMsg(connected);
    scrollToBottom();
}

// Fonction pour scroller auto en bas
function scrollToBottom() {
    heroMessage.scrollTop = heroMessage.scrollHeight;
}

function getNewMsgUser(connected, friendId) {
    popup.classList.add('hidden');
    detailsUser(connected, friendId);
}

function getAllFriendForUser() {
    // getDetailsUser(connected, friendId);
    popupBox.innerHTML = '';
    user.forEach(value => {
        if (user[connected].list_friend.includes(value.id_user)) {
            popupBox.innerHTML += `
            <div class="popup-friend" onclick="getNewMsgUser(${connected}, ${value.id_user})">
                <img src="${value.user_photo}">
                <h3>${value.username}</h3>
            </div>
            `;
        }
    })
}

searchBtn.addEventListener('input', () => {
    let valueSearch = capitalize(searchBtn.value.trim());
    if(valueSearch === '') {
        printUserMsg(connected);
    } 
    else {
        navAllUser.innerHTML = '';
        user.forEach(key => {
            if(key.username.startsWith(valueSearch)) {
                navAllUser.innerHTML += `
                    <div class="nav-user" onclick="detailsUser(${connected}, ${key.id_user})">
                        <img class="img" src="${key.user_photo}" >
                        <div class="nav-username">
                            <div class="box-one">
                                <h3 class="name">${key.username}</h3>
                                <p class="content">${key.last_message.content}</p>
                            </div>
                            <div class="box-two">
                                <span "date">${key.last_message.hours}</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        })
    }
})

newDiscuss.addEventListener('click', () => {
    popup.classList.remove('hidden');
    getAllFriendForUser();
})

popupClose.addEventListener('click', () => {
    popup.classList.add('hidden');
})
/**** 
*Fin* 
*****/

/* Session Group */
function printGroup() {
    h1.innerHTML = 'Groupes';
}
/**** 
*Fin* 
*****/

/* Session Podcast */
function printPodcast() {
    h1.innerHTML = 'Diffusions';
}
/**** 
*Fin* 
*****/

/* Session Archive */
function printArchive() {
    h1.innerHTML = 'Archives';
}
/**** 
*Fin* 
*****/

/* Session Ajouter User */
function printAddUser() {
    h1.innerHTML = 'Nouveau';
}
/**** 
*Fin* 
*****/

/* Routages */
document.addEventListener('click', (e) => {
    switch (e.target.id) {
        case 'messages':
            printUserMsg(connected);
            console.log("messages");
            break;
        case 'group':
            printGroup();
            console.log("group");
            break;
        case 'podcasts':
            printPodcast();
            console.log("podcasts");
            break;
        case 'archive':
            printArchive();
            console.log("archive");
            break;
        case 'add_box':
            printAddUser();
            console.log("add_box");
            break;
        case 'logout':
            console.log("logout");
            break;
        default:
            break;
    }
})

/****
*Fin*
*****/
/* Update photo */
// const input = document.getElementById('img');
// const img = document.querySelector('img');

// input.addEventListener('change', () => {
//     img.src = URL.createObjectURL(input.files[0]);
// });
/**** 
*Fin* 
*****/