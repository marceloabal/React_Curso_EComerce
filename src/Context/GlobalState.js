import React, { Component } from 'react';
import NetContext from './NetContext';


class GlobalState extends Component {
  state = {
    login: localStorage.getItem('login'),
    dataUser:localStorage.getItem('dataUser'),
    newLogin:false,
    ventas:(localStorage.hasOwnProperty("ventas")?JSON.parse(localStorage.getItem('ventas')):[])
  };

  

  loginUser = dataUser => {
   this.setState({
      login:true,
      dataUser:dataUser,
      newLogin:true
    });
    localStorage.setItem('login',this.state.login)
  };
  logout = ()=>{
    
    this.setState({
      login:false,
      dataUser:null,
      newLogin:false
    })
    localStorage.removeItem('login')
    window.location.href='/'
  }
  setNewLogin = (status)=>{
    this.setState({
      newLogin:status
    })
  }
  setAmigos = (id)=>{
    
    const amigo = this.state.amigos.indexOf(id)
    let arr = this.state.amigos
    if(amigo!=-1){
      
      arr.splice( amigo, 1 );
      this.setState({
        amigos:arr
      })
    }else{
      arr = this.state.amigos.concat([id])
      this.setState({
        amigos:arr
      })
    }
    
    localStorage.setItem('amigos',JSON.stringify(arr))
  } 
  getAmigo = (id)=>{
    return this.state.ventas.indexOf(id)!=-1
  }


  render() {
    return (
      <NetContext.Provider
        value={{
          login:this.state.login,
          loginUser:this.loginUser,
          logout:this.logout,
          newLogin:this.state.newLogin,
          setNewLogin:this.setNewLogin,
          ventas:this.state.ventas,
          setVentas:this.setVentas,
          getVenta:this.getVenta
        }}
      >
        {this.props.children}
      </NetContext.Provider>
    );
  }
}
export default GlobalState;
