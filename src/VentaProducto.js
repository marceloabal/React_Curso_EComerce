import React from 'react';
import { Card,  Row, Col } from 'react-bootstrap';
import Comprar from './Comprar'

const fueComprado = false;

function VentaProducto({datos,id}){

    console.log(fueComprado) 



 

    return(
        <div>
        <Card style={{ margin:'auto',marginBottom:'10px'}}>
            <Card.Body>
            <Card.Img style={{ width: '300px' }} variant="top" src={require ("./noProduct.jpg")} />                
            <Card.Title>{datos.nombre} </Card.Title>                
            <Card.Subtitle>{datos.descripcion}</Card.Subtitle>
            <Card.Text>
                <Row>
                    <Col>
                          <label>Precio</label>
                    </Col>
                    <Col>
                        {datos.precio}
                    </Col>                    
                </Row>  
                <Row>
                     <Col>
                    </Col>
                    <Col>
                        <Comprar fueComprado ={ fueComprado} /> 
                    </Col>                    
                </Row>                     
                </Card.Text>
            </Card.Body>
         </Card>           
        </div>
    )
}
export default VentaProducto;

               

