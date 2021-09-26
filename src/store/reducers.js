import { SET_ACTIVE_CHAT, SET_ACTIVE_USER, SET_CHATS, SET_MESSAGES, SET_USERS } from "./const"

const main = {
    users: [],
    chats: [],
    userActive: null,
    activeChats: [],
    isShowChat: false,
    chatActive: null,
    newUserForm: null,
    message: null,
    messageObj: null
}

export const redusers = (state = main, action) => {
    switch(action.type){
        case SET_USERS: 
            return {...state, users: action.users}
        case SET_ACTIVE_USER:
            return {...state, userActive: action.userActive}
        case SET_MESSAGES:
            return {...state, message: action.message}
        case SET_ACTIVE_CHAT:
            return {...state, chatActive: action.chatActive}
        case SET_CHATS:
            return {...state, chats: action.chats}           
        default: 
            return state
    }
}