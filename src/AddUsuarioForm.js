import React,{Component} from 'react';
import { Jumbotron, Container, Card, Row, Col,Form,Button,Spinner,Alert } from 'react-bootstrap';
import firebase from './firebase';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';


class AddUsuarioForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            titulo: props.titulo,
            nombre:'',
            apellido:'',
            ciudad:'',
            email:'',
            password:'',
            spinner:false,
            error:false
        }

      }   

      componentWillReceiveProps(props){
        this.state = {titulo: props.titulo}
            }      
      
      render(){
    
        return(
            <>
          <Jumbotron fluid>            
                <Card style={{ width: '80%', margin:'auto' }}>
                    <Card.Body>
                    <Card.Title>Nuevo Usuario</Card.Title>
                    <Formik
                        initialValues={{ 
                          nombre:'',
                          apellido:'',
                          ciudad:'',                          
                          email: '',
                          password: '' }}

                          validate={values => {
                            const errors = {};
                        
                            if (!values.nombre) {    
                              errors.nombre = '*';
                            }
                            if (!values.apellido) {    
                              errors.apellido = '*';
                            }
                            if (!values.ciudad) {      
                              errors.ciudad = '*';
                            }       
                            if (!values.password) { 
                              errors.password = '*';
                            }
                        
                            if (!values.email) {
                              errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                          this.setState({
                              spinner:true
                          }) 
                          firebase.auth.createUserWithEmailAndPassword(values.email, values.password)
                          .then((data)=>{
                            firebase.db.collection("usuarios").add({
                              nombre: values.nombre,
                              apellido: values.apellido,
                              ciudad: values.ciudad,
                              email: values.email,
                              password: values.password,
                              userId: data.user.uid
                            })
                            .then((data) => {
                              this.setState({
                                  spinner:false
                                  })
                              setSubmitting(false);
                              const { history } = this.props;
                              history.push('/usuarios');
                              })
                              .catch(error => {
                                console.log("Error 1",error)
                                    this.state.error=true;
                                    this.setState({
                                        spinner:false,
                                        error:true
                                    })
                                    setSubmitting(false);
                                
                                })                              
                         })
                         .catch(error => {
                          console.log("Error 2",error)
                          this.state.error=true;
                          this.setState({
                          spinner:false,
                          error:true
                                })
                          setSubmitting(false);
                            
                        })                        
                        }
                      }
        
                    >

                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                            }) => (  

                              <Form onSubmit={handleSubmit}>
                              <Form.Group controlId="formBasicNombre">
                                  <Form.Label>Nombre</Form.Label>
                                  <Form.Control type="nombre" placeholder="Ingrese el Nombre" name="nombre" value={values.nombre} onChange={handleChange} />
                                  {errors.nombre && touched.nombre && errors.nombre}
                              </Form.Group>

                              <Form.Group controlId="formBasicApellido">
                                    <Form.Label>apellido</Form.Label>
                                    <Form.Control type="apellido" placeholder="Ingrese el Apellido" name="apellido" value={values.apellido} onChange={handleChange} />
                                    {errors.apellido && touched.apellido && errors.apellido}
                                </Form.Group>

                                <Form.Group controlId="formBasicCiudad">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control type="ciudad" placeholder="Ingrese la Ciudad" name="ciudad" value={values.ciudad} onChange={handleChange} />
                                    {errors.ciudad && touched.ciudad && errors.ciudad}
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name="email" value={values.email} onChange={handleChange} />
                                    {errors.email && touched.email && errors.email}
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} />
                                    {errors.password && touched.password && errors.password}
                                </Form.Group>                    
                    
                  

                                <Button variant="primary" type="submit" disabled={isSubmitting}>
                                    {
                                        this.state.spinner && 
                                        <Spinner animation="border" variant="light" size="sm" />
                                    }
                                    
                                    Ingresar
                                </Button>
                            </Form>
                    )}

                    </Formik>
                    {this.state.error && 
                        <>
                        <Alert variant={'danger'}>
                            Error de Actualizacion       
                        </Alert>
                        </>
                    } 
                    </Card.Body>
                </Card>


            </Jumbotron>            
            </>  
        )
    }
}


export default withRouter(AddUsuarioForm);




                
                  


 



/*
import React,{Component} from 'react';
import { Jumbotron, Container, Card, Row, Col } from 'react-bootstrap';
import firebase from './firebase';
import { withRouter } from 'react-router-dom';

class AddUsuarioForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            titulo: props.titulo,
            nombre:'',
            apellido:'',
            ciudad:'',
            email:'',
            password:'',
            isFormValid: false,
        }

      }

componentDidUpdate(prevProps, prevState) {
        if (this.state.email !== prevState.email || this.state.password !== prevState.password) {
          this.validateForm()
        }
      }


validateForm = () => {

        const emails    = this.state.email.split('@')
        console.log(this.state)
        console.log(emails.length)

        if (this.state.password != '' && emails.length >= 2 ) 
        {
          this.setState({isFormValid: true})
          console.log('Verdadero')
        } else {
          this.setState({isFormValid: false})
          console.log('falso')
        }
      }



componentWillReceiveProps(props){
    this.state = {titulo: props.titulo}
      }


 uploadImage = uri => {
        return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          xhr.onerror = reject;
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              resolve(xhr.response);
            }
          };
      
          xhr.open("GET", uri);
          xhr.responseType = "blob";
          xhr.send();
        });
 };



handleSubmit = (e)=> {
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
              history.push('/usuarios');              
          })
          .catch((err)=>{
            alert(err) 
            console.log(err)
            })
    })
    .catch((error)=>{
        console.log("Error",error)
        alert(error)
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
                            
                            
                            <button type="submit" class="btn btn-primary" disabled={!this.state.isFormValid} >Enviar</button>
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

export default withRouter(AddUsuarioForm);

*/