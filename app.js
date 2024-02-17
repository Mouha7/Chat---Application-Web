let user = [
    {
        id_user: 0, // (int, PK)
        username: "test",  // (string)
        email: "devops@gmail.com", // (string)
        password: "p", // (string)
        number: "784590654", // (string)
        user_photo: "./img/product1.jpg", // (string)
        state: false, // (bool)
        last_message: '', // (string)
        blocked_user: [] // (array)
    },
    {
        id_user: 1, // (int, PK)
        username: "Aliou",  // (string)
        email: "aliou@gmail.com", // (string)
        password: "p", // (string)
        number: "784590654", // (string)
        user_photo: "./img/product5.jpg", // (string)
        state: false, // (bool)
        last_message: '', // (string)
        blocked_user: [] // (array)
    },
    {
        id_user: 2, // (int, PK)
        username: "Mouhamed Sow",  // (string)
        email: "mouha@gmail.com", // (string)
        password: "p", // (string)
        number: "784590654", // (string)
        user_photo: "./img/product2.jpg", // (string)
        state: false, // (bool)
        last_message: '', // (string)
        blocked_user: [] // (array)
    },
];

let message = [
    {
        id_msg: 0, // (int, PK)
        content: "Bonjour, comment se déroule ton projet ?", // (string)
        date: '10/02/2023', // (datetime)
        hours: '10h30', // (datetime)
        id_sender: 1, // (int, FK references User.id_user)
        id_receiver: 0, // (int, FK references User.id_user)
        seen: true // (bool)
    },
    {
        id_msg: 1, // (int, PK)
        content: "Bonjour, le projet avance douce, j’espère faire du bon travail.", // (string)
        date: '10/02/2023', // (datetime)
        hours: '10h35', // (datetime)
        id_sender: 0, // (int, FK references User.id_user)
        id_receiver: 1, // (int, FK references User.id_user)
        seen: false // (bool)
    },
    {
        id_msg: 2, // (int, PK)
        content: "Bonsoir, peux-tu m'aider ton projet ?", // (string)
        date: '10/02/2023', // (datetime)
        hours: '20h30', // (datetime)
        id_sender: 2, // (int, FK references User.id_user)
        id_receiver: 0, // (int, FK references User.id_user)
        seen: false // (bool)
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
connected = 0
/* Récupération des messages */
function getGroupMsgByUser(connected) {
    let msg_groupes = [];
    user.forEach(key => {
        if(key.id_user != connected) {
            message.forEach(value => {
                if((connected === value.id_sender && key.id_user === value.id_receiver) || (connected === value.id_receiver && key.id_user === value.id_sender)) {
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
        if(id !== connected) {
            new_array.push(id);
        }
    })
    return new_array;
}
//Fonction Pour retourner les amis d'un user
function getGroupUserFriends(connected) {
    let array_id = getAllIdFriendUser(connected);
    let array_users = [];
    array_id.forEach(id => {
        array_users.push(getUser(id));
    });
    return array_users
}

function getUser(id) {
    for(let i=0; i<user.length; i++) {
        if(user[i].id_user === id) {
            return user[i];
        }
    }
    return null;
}

function getLastMsg(connected, friend) {
    let stock;
    for(let i=0; i<message.length; i++) {
        if((message[i].id_sender === connected && message[i].id_receiver === friend) || (message[i].id_sender === friend && message[i].id_receiver === connected)) {
            stock = message[i];
        }
    }
    return stock;
}
// Join Un User avec son dernier message 
function joinUserLastMsg(connected) {
    let array_id = getAllIdFriendUser(connected);
    let array_users = getGroupUserFriends(connected);
    for(let i=0; i<array_users.length; i++) {
        for(let j=0; j<array_id.length; j++) {
            if(array_users[i].id_user === array_id[j]) {
                array_users[i].last_message = getLastMsg(connected, array_id[j]);
            }
        }
    }
    return array_users;
}



console.log(joinUserLastMsg(connected))
/* Fin */