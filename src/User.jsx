import React from 'react'
class User extends React.Component {
    constructor(props){
        super(props)
        this.state = {
         
        }
        
    }
    login(){

    }
    logout(){ 

    }
    render(){
        return(
            <div className='user' onClick={this.props.onClick}>
                <img className='avatar' src = {this.props.avatar}></img>
                <div className='inform'>
                    <h4 className='fio'>{this.props.fio}</h4>
                    <p className='phone'>{this.props.phone}</p>
                    <a className='email'>{this.props.email}</a>
                </div>
            </div>
        )
        
    }
}
export default User