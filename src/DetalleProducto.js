import React, {useState, useEffect} from 'react';
import { Jumbotron, Container, Card,  Row, Col } from 'react-bootstrap';
import firebase from './firebase';
import { useHistory } from "react-router-dom";

function DetalleProducto(props){

    const history = useHistory();

    const [datos, setDatos] = useState({});
    useEffect(
        () => {
            const id = props.match.params.id;
            firebase.db.doc("productos/"+id)
            .get()
            .then(doc=>{
                setDatos( doc.data() )
                console.log(doc.data())
            })
    }, []); 
    const handleClick = ()=>{
        const id = props.match.params.id;
        firebase.db.doc("productos/"+id)
        .delete()
        .then(doc=>{
            console.log(doc)
            history.push("/productos");
        })
    }
    const handleClickUpdate = ()=>{
        const id = props.match.params.id;
        firebase.db.doc("productos/"+id)
        .set({
            nombre:datos.nombre,
            sku:datos.sku,
            descripcion:datos.descripcion,
            precio: datos.precio
        },{merge:true})
        .then(doc=>{
            console.log(doc)
            history.push("/productos");
        })
    }
    const handleChange = (e)=>{
        const target = e.target;
        const value = target.value
        const name = target.name;

      
        setDatos({
            ...datos,
            [name] : value});
    }  
        
        


    return(   
        <Jumbotron fluid>
        <Container>             
        <div> <h2>Detalle del Producto</h2>
        <Card style={{ width: '30rem' }}>
            <Card.Text>
                <Card.Body>         
                <Row>
                <Col>
                       <label>Nombre</label>
                    </Col>
                    <Col>
                       <input type="text" name="nombre" value={datos.nombre} onChange={handleChange}></input>
                    </Col>                    
                </Row> 
                <Row>
                    <Col>
                        <label>Descripcion</label>
                    </Col>
                    <Col>
                        <input type="text" name="descripcion" value={datos.descripcion} onChange={handleChange}></input>
                    </Col>                    
                </Row> 
                <Row>
                    <Col>
                        <label>SKU</label>
                    </Col>
                    <Col>
                        <input type="text" name="sku" value={datos.sku} onChange={handleChange}></input>
                    </Col>                    
                </Row> 
                <Row>
                    <Col>
                        <label>Precio</label>
                    </Col>
                    <Col>
                    <input type="text" name="precio" value={datos.precio} onChange={handleChange}></input>
                    </Col>                    
                </Row>  
                <Row>

                </Row>
                <Row>
                    <Col>
                    <button onClick={handleClick} class="btn btn-primary">Eliminar</button>
                    </Col>
                     <Col>
                    <button onClick={handleClickUpdate} class="btn btn-primary">Actualizar</button>
                    </Col>                    
                  </Row>  
               </Card.Body>
            </Card.Text>
        </Card>                                                                                                                      
        </div>

        </Container>
    </Jumbotron>          
    )
}
export default DetalleProducto;