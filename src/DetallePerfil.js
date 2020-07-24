import React, {useState, useEffect} from 'react';
import { Jumbotron, Container, Card,  Row, Col } from 'react-bootstrap';
import firebase from './firebase';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';

function DetallePerfil(props){

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
            history.push("/usuarios");

    }
        


    return(   
        <Jumbotron fluid>
        <Container>             
        <div> 
        <h2>Ver datos del Usuario</h2>
        <Card style={{ width: '30rem' }}>
            <Card.Text>
                <Card.Body>         
                <Row>
                    <Col>
                       <label>Nombre</label>
                    </Col>
                    <Col>
                       {datos.nombre}
                    </Col>                    
                </Row> 
                <Row>
                    <Col>
                        <label>Apellido</label>
                    </Col>
                    <Col>
                        {datos.apellido} 
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
                        {datos.ciudad}
                    </Col>                    
                </Row>  
                <Row>
                    <Col>
                    
                    </Col>
                     <Col>
                     <button onClick={handleClick} class="btn btn-primary">Cerrar</button>
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
export default withRouter(DetallePerfil);