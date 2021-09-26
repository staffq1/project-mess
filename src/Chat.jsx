import React from 'react'
import SendForm from './SendForm.jsx'

class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state = {
         
            
        } 
    }
   
    share(message, to){ 

    }
    
    
  

    render(){
        
        return(
            <div className = 'chat' onClick={this.props.onClick}>
                <img src={this.props.to.avatar}></img>
                <div>
                    <div className = 'user'>{this.props.to.fio}</div>
                    <div className = 'message' >
                     
                      
                        {this.props.messages.length == 0 ? "" : this.props.messages[this.props.messages.length - 1].text }
                       
                    </div>
                </div>
   
            </div>
        )
      
    }
}

export default Chat