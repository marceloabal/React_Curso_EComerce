import React from 'react';
import {Link} from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';


function Perfil({datos,id}){
    return(
        <Card style={{ margin:'auto',marginBottom:'10px'}}>
        <Card.Body>
            <Card.Img style={{ width: '200px' }} variant="top" src= {require ("./noFoto.jpg")} />
            <Card.Title>{datos.nombre} {datos.apellido} <Link to={'/editar-perfil/'+id} ><PencilSquare  /></Link></Card.Title>
            <Card.Subtitle>{datos.email}</Card.Subtitle>
            <Button variant="primary" >
                <Link to={'/detalle-perfil/'+id} style={{color:'rgb(255,255,255)'}}>Ver Detalle</Link>
            </Button>
            
        </Card.Body>
    </Card>
)
}
export default Perfil;


