import React from 'react'

import User from './User.jsx'
import Message from './Message.jsx'
import Chat from './Chat.jsx'
import SendForm from './SendForm.jsx'
import {connect, content} from 'react-redux'
import {setMessages, setUsers, setActiveUser, setChats, setActiveChat} from './store/action'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chats: [],
            userActive: null,
            activeChats: [],
            isShowChat: false,
            chatActive: null,
            newUserForm: null,
            message: null,
            messageObj: null

        }
        
    }
    componentDidMount(){
        this.fill()
    }
    fill() {

            const arrMessages = []

            const promiseUsers = fetch('src/Users.json').then(res => res.json())
            const promiseMessages = fetch('src/Messages.json').then(res => res.json())
            const promiseChats = fetch('src/Chats.json').then(res => res.json())


            Promise.all([promiseUsers, promiseMessages, promiseChats]).then((res) => {
             
                const chatsNew = []
               
                
                const resUser = res[0]
                const usersMap = {}


                if (this.userActive === undefined) {
                    this.userActive = resUser[0]
                }

                for (let resOne of resUser) {

                    usersMap[parseInt(resOne.id)] = resOne
  
                }

            
                this.props.setUsers(Object.values(usersMap))

                const resMessages = res[1]
                let MessageObj = {}
                for (let resOne of resMessages) {

                    MessageObj = {
                        text: resOne.text,
                        files: resOne.files,
                        to: usersMap[resOne.to],
                        from: usersMap[resOne.from],
                        isIncoming: resOne.isIncoming,  
                        id: parseInt(resOne.id),
                        chat: resOne.chat 
                    }

                    arrMessages.push(MessageObj);
                   
                }

                const resChats = res[2]
                const usersChats = []
                let chatObj = {}

                for (let resOne of resChats) {

                    const newArrMessages = []
                       
                    for (let sMessages of arrMessages) {

                        for (let sResOneMessages of resOne.messages) {

                            if (sMessages.id == sResOneMessages) {
                                newArrMessages.push(sMessages)
                                                           
                            }
                        }
                    }
                   
                    chatObj = {
                        messages: newArrMessages,
                        from: usersMap[parseInt(resOne.from)],
                        to: usersMap[parseInt(resOne.to)],

                        id: parseInt(resOne.id)
                    }
                   
                    chatsNew.push(chatObj)
                }
               
         
                this.props.setChats(chatsNew)
                    
                    
            })
    }

    setUserActive(user) {
 
        const activeChat = []

        for (let chat of this.props.chats) {
         
            if ((parseInt(user.id) == parseInt(chat.from.id)) || (parseInt(user.id) == parseInt(chat.to.id))) {
           
                if (parseInt(user.id) != parseInt(chat.from.id)) {
              
                    let temp
                    temp = chat.from
                    chat.from = chat.to
                    chat.to = temp
                }
                
                for (let messag of chat.messages) {
                   
                    if (chat.from.id == messag.from.id) {
                        messag.isIncoming = true
                       
                    } else {
                        messag.isIncoming = false

                        messag.to = messag.from
                        
                    }

                }
            
                activeChat.push(chat)
  
            }

        }
        this.setState({activeChats: activeChat, chatActive: ''})
        this.props.setActiveUser(user)
   
      
    }

    openChat(chat){
        this.setState({isShowChat: true, chatActive: chat})

    }

    creatNewUser(ev){ 
        ev.preventDefault()
        
        const id = Math.round(Math.random() * 1000)
       
        let newUser = {
            phone: ev.target.phone.value, 
            email: ev.target.email.value, 
            fio: ev.target.fio.value, 
            avatar: ev.target.avatar, 
            id: id
        }
        
        const userRandomId = Math.round(Math.random() * this.props.users.length)

        const newChat = {
            messages: [],
            from: newUser,
            to:  this.props.users[userRandomId],
            id: id
        }
        
   
        this.setState({newUserForm: false})

        this.props.setChats([...this.state.chats, newChat])

        this.props.setUsers([...this.props.users, newUser])
        setTimeout(()=> this.setUserActive(newUser), 200)
         
    }
    
    creatFormUser(user){
        this.setState({isShowChat: true, newUserForm: user})
  
    }

    send(message){ 
        const chatActive = {...this.state.chatActive}

        if(this.state.messageObj === null){
            chatActive.messages.push(message) 
        }else{
            chatActive.messages.push({...message, quot: {...this.state.messageObj}})
            this.setState({messageObj: null})
        }
        
        this.setState({chatActive: chatActive})
     
    }

    responseMessage(messageObj){
      
        this.setState({messageObj: messageObj})
      
    }
    
    

    render() {
         
        return(
            <div className='wrapper'>
                <aside className='users-aside'>
                    <header><h1>Пользователи</h1></header>
                    <div className='users'>
                        {this.props.users.map(user => 
                        <User phone={user.phone} email={user.email} fio={user.fio} avatar={user.avatar} id={user.id} onClick={()=> this.setUserActive(user)}>
                        
                        </User>)}
                        
                        <button onClick={user => this.creatFormUser(user)}>+</button>

                        {this.state.newUserForm ? <form action="" onSubmit={(ev)=> this.creatNewUser(ev)}>
                            <input name='fio' placeholder = 'фио' />
                            <input name='phone' placeholder = 'phone' />
                            <input name='email' placeholder = 'email' />
                            <button type = 'submit'  >OK</button>
                        </form> : <form></form>}

                    </div>
                </aside>
                <aside className='chats-aside'>
                    <header><h1>Чаты</h1></header>
                    <div className='chats'>
                        <div className='chats-user'>
                            {this.state.activeChats.map(chat => 
                            <Chat messages={chat.messages} from={chat.from} to={chat.to} id={chat.id} onClick={()=> this.openChat(chat)}>
                               
                                
                            </Chat>)}
                            
                        </div>
                    </div>
                </aside>
             
                <section>
                    {this.state.chatActive ?<div className='render-messages'>
                        <div className = 'messages-wrapper' >
                            <div className = 'chat-body'>

                            {this.state.chatActive.messages.map(message => 
                                <Message text={message.text} files={message.files} to={message.to} from={message.from} isIncoming={message.isIncoming} id={message.id} chat={message.chat} quot={message.quot} responseMessage={messageObj => this.responseMessage(messageObj)}>
                                    
                                </Message>)}
                            </div>
                             
                            {this.state.messageObj !== null && <div className='quote'>
                                <div>  
                                    <div>{this.state.messageObj.from.fio ? this.state.messageObj.from.fio : this.state.messageObj.to.fio}</div> 
                                    {this.state.messageObj.text}
                                </div>
                                <button onClick={() => this.setState({messageObj: null})}>
                                    <div>+</div>
                                </button>
                            </div>}
                            <SendForm to={this.state.chatActive.to} from={this.state.chatActive.from} id={this.state.chatActive.id} send={message => this.send(message)}>
                                    
                            </SendForm>
                    
                        </div> 
                          
                    </div> : <div></div>}
             
                    
                </section>
            </div>
        )
        
        
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
    users: state.users,
    activeUser: state.activeUser,
    chats: state.chats,
    activeChat: state.activeChat
})

const mapActinsToProps = {
    setMessages: setMessages,
    setActiveUser: setActiveUser,
    setUsers: setUsers,
    setChats: setChats,
    setActiveChat: setActiveChat

}
export default connect(mapStateToProps, mapActinsToProps)(App)




