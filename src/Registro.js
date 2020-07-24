import React,{Component} from 'react';
import { Jumbotron, Container, Card, Row, Col } from 'react-bootstrap';
import firebase from './firebase';
import { withRouter } from 'react-router-dom';

class Registro extends Component{
    constructor(props){
        super(props)
        this.state = {
            titulo: props.titulo,
            nombre:'',
            apellido:'',
            ciudad:'',
            email:'',
            password:''
        }

      }
 // this.state = {titulo: props.titulo,
    componentWillReceiveProps(props){
        this.state = {titulo: props.titulo}
      }

handleSubmit(e){
    console.log(this.state); 
    let email=this.state.email;
    let password=this.state.password;    
    console.log(this.state.nombre);
    firebase.auth.createUserWithEmailAndPassword(email, password)
    .then((data)=>{
        console.log("Usuario creado",data.user.uid)
        firebase.db.collection("usuarios").add({
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            ciudad: this.state.ciudad,
            email: this.state.email,
            userId: data.user.uid
          })
          .then((data)=>{
              console.log(data)
              const { history } = this.props;
              history.push('/');
              //<Login title={'Ingrese Usuario/Contraseña'} />

          })
          .catch((err)=>{
            console.log(err)
            })
    })
    .catch((error)=>{
        console.log("Error",error)
    })
    e.preventDefault();
}

  handleChange(event) {
    
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
    render(){
        return(
            <div class="row">
                <div class="col-12  col-sm-6">
                    <form onSubmit={this.handleSubmit.bind(this)}>            
                    <Jumbotron fluid>
                    <Container>              
                    <div className="Registro">
                        <div>
                            <h2>{this.state.titulo} </h2>
                        </div>
                        <Card style={{ width: '20rem' }}>
                        <Card.Text>
                            <Card.Body>              
                                <Row>
                                    <Col>
                                    <label>Nombre</label>
                                    </Col>
                                    <Col>
                                    <input name="nombre" value={this.state.nombre} onChange={this.handleChange.bind(this)}  type="text" class="form-control" id="nombre" aria-describedby="emailHelp" placeholder="Ingresar Nombre"></input>
                                    </Col>                    
                                </Row> 
                                <Row>
                                    <Col>
                                    <label>Apellido</label>
                                    </Col>
                                    <Col>
                                    <input name="apellido" value={this.state.apellido} onChange={this.handleChange.bind(this)}  type="text" class="form-control" id="apellido" aria-describedby="emailHelp" placeholder="Ingresar Apellido"></input>
                                    </Col>                    
                                </Row> 

                                <Row>
                                    <Col>
                                    <label>Ciudad</label>
                                    </Col>
                                    <Col>
                                    <input name="ciudad" value={this.state.ciudad} onChange={this.handleChange.bind(this)}  type="text" class="form-control" id="ciudad" aria-describedby="emailHelp" placeholder="Ingresar Ciudad"></input>
                                    </Col>                    
                                </Row> 
                                <Row>                                    
                                    <Col>
                                    <label>Correo Electronico</label>
                                    </Col>
                                    <Col>
                                    <input name="email" value={this.state.email} onChange={this.handleChange.bind(this)}  type="text" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Ingresar email"></input>
                                    </Col>                    
                                </Row>                                   
                                <Row>
                                    <Col>
                                    <label>Password</label>
                                    </Col>
                                    <Col>
                                    <input name="password" value={this.state.password} onChange={this.handleChange.bind(this)}  type="password" class="form-control" id="password" aria-describedby="emailHelp" placeholder="Ingresar Password"></input>
                                    </Col>                    
                                </Row>  
  
                             </Card.Body>
                        </Card.Text>    
                        <Row>
                            <Col>
                    
                            </Col>
                            <Col>
                            <button type="submit" class="btn btn-primary">Enviar</button>
                            </Col>                    
                        </Row>  
                        </Card>                        
                    </div>
                    </Container>
                    </Jumbotron>   
                    </form>
                </div>
            </div>                
        );
    }
}

export default withRouter(Registro);