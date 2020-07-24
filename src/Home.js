import React,{Component} from 'react';
import VentaProducto from './VentaProducto';
import { Jumbotron, Col, Container,Spinner,Alert  } from 'react-bootstrap';
import firebase from './firebase';
import NetContext from './Context/NetContext';
import {Link} from "react-router-dom";

class Home extends Component{
    static contextType = NetContext
    constructor(){
        super()  
        this.state={productos:[],
            isLoaded:false,
    }
}

async componentDidMount(){
    
    if(this.context.login){
        firebase.db.collection("productos/")
        .get()
        .then(querySnapshot=>{
            console.log("productos",querySnapshot.docs)
            this.setState({
                productos:querySnapshot.docs,
                isLoaded:true,
            })
            
            
        })
    }
    
}

agregarAlCarro(){}

    render(){
        if(!this.context.login){
            return(
                <Container>
                    <Alert variant={'info'}>
                        Debe autenticarse en el sistema    
                        <Link to={'/login'}>Ir a login</Link>        
                    </Alert>  
                </Container>
            )
        } else if(!this.state.isLoaded){
            return (
                <Container className="loader">
                    <Spinner  animation="grow" />
                    <Spinner  animation="grow" />
                    <Spinner  animation="grow" />                
                </Container>
            )
            } else{
                return(
                        <Jumbotron fluid>
                            <Container> 
                                <div>
                                    <h2>Tienda</h2>
                                    {this.state.productos.map((doc)=><Col xs={6} key={doc.id}> <VentaProducto datos={doc.data()} id={doc.id}/></Col>)}                               
                                </div>
                            </Container>
                        </Jumbotron>   
                  
            )
        }
    } 
}
export default Home;