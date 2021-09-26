import React from 'react'
class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isClickMouse: false,
            movementX: 0,
            isMove: false,
            sec: 0
        } 
    }

    componentDidMount(){
        document.body.addEventListener('mouseup', ()=>{
           
          
            if(this.state.isMove){


                for(let i = 1; i < this.state.movementX; ++i){
                    
                    setTimeout(()=>{

                        this.setState({isClickMouse: false, movementX: --this.state.movementX})
                     
                    }, i)
                   
                }

                this.props.responseMessage(this.props)
                this.setState({isMove: false})
  
            }        
        
        })
    }

    onMouseDown(ev){
     
        this.setState({isClickMouse: true})
    }

    onMouseMove(ev){
        
        if(this.state.isClickMouse){
          
            let moveNum 
          
            if(ev.movementX <= 0){
                
                if(this.state.movementX < 140){

                    moveNum = ev.movementX * -1 + this.state.movementX
                    
                    if(moveNum > 25){
                        this.setState({isMove: true})
                    }
                }
              

            }
            if(moveNum !== undefined){
                this.setState({movementX: moveNum})  
            }
            
            
        }
        
    }
 
 
    

    render() {
        
        return(
            
            <div className={this.props.isIncoming === false ? 'message left' : 'message rigth'} style={{right: 0 + this.state.movementX + 'px'}} onMouseDown={ev => this.onMouseDown(ev)} onMouseMove={ev => this.onMouseMove(ev)} >
                <div className="message-content">
                    {this.props.quot !== undefined && <div className="quot">
                        <h6>{this.props.quot.from ? <div>{this.props.quot.from.fio}</div>:<div>{this.props.quot.to.fio}</div>}</h6> 
                        <small>{this.props.quot.text}</small> 
                    </div>}
                    <div className='mes-autor'>
                        <h5 className='h5'>
                        {this.props.isIncoming === false ? this.props.to.fio : this.props.from.fio}
                        </h5> 
                
                        <p>{this.props.text}</p>
                    </div>
                </div>
                
                <button className='mes-btm'>
                    <div>⮫</div>
                </button>
            </div>
        )
       
    }
}

export default Message


//  постфикснвя а++ запись возращается значени а до сложкния
//  префиксная ++а запись возращается значени а после сложкния