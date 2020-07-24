import React,{Component} from 'react';
import Perfil from './Perfil';
import { Jumbotron, Container, Card, Button, Row, Col } from 'react-bootstrap';
import firebase from './firebase';

class Usuarios extends Component{
    constructor(){
        super()  
        this.state={perfiles:[],
            isLoaded:false
    }
}

async componentDidMount(){
    console.log(localStorage.getItem("login"))
    if(localStorage.getItem("login")){
        firebase.db.collection("usuarios/")
        .get()
        .then(querySnapshot=>{
            console.log("usuarios",querySnapshot.docs)
            this.setState({
                perfiles:querySnapshot.docs,
                isLoaded:true
            })
            
            
        })
    }
    
}

    render(){
            return(
                <Jumbotron fluid>
                <Container>   
                <div>
                    <h2>Usuarios</h2>
                </div>                                  
                 <div>
                    {!this.state.isLoaded &&  <div> Loading </div>}
                 </div> 
                 <div>
                    {this.state.isLoaded &&  
                        <div>    
                            <div>
                                {this.state.perfiles.map((doc)=><Col xs={6} key={doc.id}><Perfil datos={doc.data()} id={doc.id} /></Col>)}
                                
                             </div>
                        </div>}
                    </div> 
                </Container>
                </Jumbotron>      
                )
            }
                
}
export default Usuarios;


//{this.state.perfiles.map((doc)=><Perfil datos={doc.data()} id={doc.id}/>)}


         /*
        if(!this.state.isLoaded){
            return(
                <div>
                    Primero debe Loggearse
                </div>
            )
        } else{
            return(
                <Jumbotron fluid>
                    <Container> 
                        <div>
                            <h2>Usuarios</h2>
                            
                            {this.state.perfiles.map((doc)=><Perfil datos={doc.data()} id={doc.id}/>)}

                        </div>
                    </Container>
                </Jumbotron>                 
            )
        }
    } 
    */
