import React from 'react';
import {Link} from "react-router-dom";
import {  Card,  Row, Col } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';

function Producto({datos,id}){
    return(
        <div>
        <Card style={{ margin:'auto',marginBottom:'10px'}}>
        <Card.Text>
            <Card.Body>
            <Card.Img style={{ width: '200px' }} variant="top" src={require ("./noProduct.jpg")} />                
            <Card.Title>{datos.nombre} <Link to={'/detalle-Producto/'+id} ><PencilSquare  /></Link></Card.Title>         
            <Card.Subtitle>{datos.descripcion} </Card.Subtitle>
               <Row>
                    <Col>
                        <label>SKU</label>
                    </Col>
                    <Col>
                        {datos.sku}
                    </Col>                    
                </Row> 

                <Row>
                    <Col>
                        <label>Precio</label>
                    </Col>
                    <Col>
                        {datos.precio}
                    </Col>                    
                </Row> 
            </Card.Body>
        </Card.Text>
        </Card>           
        </div>
    )
}
export default Producto;


