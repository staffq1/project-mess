import React from 'react'
import Message from './Message.jsx'
class SendForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            files: [],
            chatId: 100
        }  
    }
    submit(ev) {
        ev.preventDefault()
       
        let message = {
            text: this.state.text,
            files: this.state.files,
            to: this.props.to,
            from: this.props.from,
            isIncoming: true,
            id: this.state.chatId + 100,
            chat: this.state.chatId 
        }
        
        this.props.send(message)
        
        this.setState({text: ''})
        
    }
    attach(ev, file) {
        ev.preventDefault()
       
    }
    
    changeTextarea(ev){
 
        this.setState({text: ev.target.value})
    }

    render() {
        return(
            <form>
               <textarea className='message-form' value = {this.state.text} onChange={(ev)=> this.changeTextarea(ev)}></textarea >

                <div className='content-btm'>
                    <button className='attach' onClick={(ev)=> this.attach(ev)}>
                    <img src="./src/images/add.png"></img>
                      
                    </button>
                    <button className='send' onClick={(ev)=> this.submit(ev)}>
                    <img src="./src/images/mes.png"></img>
                     
                    </button>
                </div>
            </form>
        )
       
    }
}
export default SendForm




