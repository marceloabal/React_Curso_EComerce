import React, {useState, useEffect} from 'react';
import { Jumbotron, Container, Card,  Row, Col } from 'react-bootstrap';
import firebase from './firebase';
import { useHistory } from "react-router-dom";

function EditarPerfil(props){

    const history = useHistory();

    const [datos, setDatos] = useState({});
    useEffect(
        () => {
            const id = props.match.params.id;
            firebase.db.doc("usuarios/"+id)
            .get()
            .then(doc=>{
                setDatos( doc.data() )
                console.log(doc.data())
            })
    }, []); 
    const handleClick = ()=>{
        const id = props.match.params.id;
        firebase.db.doc("usuarios/"+id)
        .delete()
        .then(doc=>{
            console.log(doc)
            history.push("/usuarios");
        })
    }
    const handleClickUpdate = ()=>{
        const id = props.match.params.id;
        firebase.db.doc("usuarios/"+id)
        .set({
            nombre:datos.nombre,
            apellido:datos.apellido,
            ciudad:datos.ciudad
        },{merge:true})
        .then(doc=>{
            console.log(doc)
            history.push("/usuarios");
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
        <div> <h2>Editar datos del Usuario</h2>
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
                        <label>Apellido</label>
                    </Col>
                    <Col>
                        <input type="text" name="apellido" value={datos.apellido} onChange={handleChange}></input>
                    </Col>                    
                </Row> 
                <Row>
                    <Col>
                        <label>Correo Electronico</label>
                    </Col>
                    <Col>
                        {datos.email}
                    </Col>                    
                </Row> 
                <Row>
                    <Col>
                        <label>Ciudad</label>
                    </Col>
                    <Col>
                    <input type="text" name="ciudad" value={datos.ciudad} onChange={handleChange}></input>
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
export default EditarPerfil;