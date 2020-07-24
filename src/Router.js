
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import MainMenu from './MainMenu';
import Home from './Home';
import Login from './Login';
import Registro from './Registro';
import DetallePerfil from './DetallePerfil';
import Perfil from './Perfil';
import DetalleProducto from './DetalleProducto';
import Producto from './Producto';
import Productos from './Productos';
import RegistroProducto from './RegistroProducto';
import Usuarios from './Usuarios';
import AddUsuarioScreen from './AddUsuarioScreen';
import GlobalState from './Context/GlobalState';
import EditarPerfil from './EditarPerfil'


export default () => {
  return (
    <GlobalState>
      <Router>
        <MainMenu />
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component = {()=> <Login title={'Ingrese Usuario/Contraseña'} />}/>
        <Route path="/productos" exact component = {()=> <Productos />}/>  
        <Route path="/usuarios" exact component = {()=> <Usuarios />}/>      
        <Route path="/registro" exact component = {()=> <Registro titulo={'Nuevo Usuario'} />}/>
        <Route path="/registroproducto" exact component = {()=> <RegistroProducto titulo={'Nuevo Producto'} />}/>
        <Route path="/detalle-Perfil/:id" exact component={DetallePerfil} />      
        <Route path="/editar-perfil/:id" exact component={EditarPerfil} />      
        <Route path="/detalle-Producto/:id" exact component={DetalleProducto} />    
        <Route path="/addusuarioscreen" exact component = {()=> <AddUsuarioScreen  />}/> 
        <Route render={() => <Redirect to="/" />} />
      </Router>
    </GlobalState>
  );
}
