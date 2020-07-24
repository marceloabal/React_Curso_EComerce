import React,{Component} from 'react';
import { Jumbotron, Container, Card, Row, Col,Form,Button,Spinner,Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import firebase from './firebase';
import { withRouter } from 'react-router-dom';

class Registro extends Component{
    constructor(props){
        super(props)
        this.state = {
            titulo: props.titulo,
            nombre:'',
            descripcion:'',
            sku:'',
            precio:'',
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
                    <Card.Title>{this.state.titulo}</Card.Title>
                    <Formik
                        initialValues={{          
                            nombre:'',
                            descripcion:'',
                            sku:'',
                            precio:'', }}
                            validate={values => {
                                const errors = {};
                                if (!values.nombre) {
                                    
                                    errors.nombre = '*';
                                }
                                if (!values.descripcion) {
                                    
                                    errors.descripcion = '*';
                                }
                                if (!values.sku) {
                                    
                                    errors.sku = '*';
                                }
                                if (!values.precio) {
                                    
                                    errors.precio = '*';
                                }
                            
                                return errors;
                            }}

                            onSubmit={(values, { setSubmitting }) => {
                                this.setState({
                                    spinner:true
                                })
                                console.log(values.name, values.descripcion)
                                firebase.db.collection("productos").add({
                                    nombre:         values.nombre,
                                    descripcion:    values.descripcion,
                                    sku:            values.sku,
                                    precio:         values.precio,
                                          })
                                    .then((data) => {
                                        this.setState({
                                            spinner:false
                                            })
                                        setSubmitting(false);
                                        const { history } = this.props;
                                        history.push('/productos');
                                        })
                                    .catch(error => {
                                            console.log("Error",error)
                                                this.state.error=true;
                                                this.setState({
                                                    spinner:false,
                                                    error:true
                                                })
                                                setSubmitting(false);
                                            
                                        });
                                        
                                    }}
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

                                    <Form.Group controlId="formBasicDescripcion">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control type="descripcion" placeholder="Ingrese la Descripcion" name="descripcion" value={values.descripcion} onChange={handleChange} />
                                        {errors.descripcion && touched.descripcion && errors.descripcion}
                                    </Form.Group>

                                    <Form.Group controlId="formBasicSku">
                                        <Form.Label>SKU</Form.Label>
                                        <Form.Control type="sku" placeholder="Ingrese el codigo" name="sku" value={values.sku} onChange={handleChange} />
                                        {errors.sku && touched.sku && errors.sku}
                                    </Form.Group>

                                    <Form.Group controlId="formBasiPrecio">
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control type="precio" placeholder="Ingrese el precio" name="precio" value={values.precio} onChange={handleChange} />
                                        {errors.precio && touched.precio && errors.precio}
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

export default withRouter(Registro);

