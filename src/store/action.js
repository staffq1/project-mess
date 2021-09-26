import { SET_ACTIVE_CHAT, SET_ACTIVE_USER, SET_CHATS, SET_MESSAGES, SET_USERS } from "./const"


export function setMessages(messages){
    return{
        type: SET_MESSAGES,
        messages: messages
    }
}

export function setUsers(users){
    return{
        type: SET_USERS,
        users: users
    }
}

export function setActiveUser(activeUser){
    return{
        type: SET_ACTIVE_USER,
        activeUser: activeUser
    }
}
export function setActiveChat(activeChat){
    return{
        type: SET_ACTIVE_CHAT,
        activeChat: activeChat
    }
}
export function setChats(chats){
    return{
        type: SET_CHATS,
        chats: chats
    }
}
