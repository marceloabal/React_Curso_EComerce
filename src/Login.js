import React, { Component} from 'react';
import { Jumbotron, Container, Card,  Row, Col,Form,Button,Spinner,Alert } from 'react-bootstrap';
import firebase from './firebase';
import { withRouter } from 'react-router-dom';
import NetContext from './Context/NetContext';
import { Formik } from 'formik';


class Login extends Component{
    static contextType = NetContext
    constructor(props){
        super(props);
        this.state={
            spinner:false,
            error:false
        }
    }
      

    


    render(){
        return(
            <>
           <Jumbotron fluid>
                <Card style={{ width: '80%', margin:'auto' }}>
                    <Card.Body>
                    <Card.Title>Ingresar</Card.Title>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.password) {
                                
                                errors.password = 'Required';
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
                            console.log(values.email, values.password)
                            firebase.auth.signInWithEmailAndPassword(values.email, values.password)
                            .then((data) => {
                                this.setState({
                                    spinner:false
                                })
                                setSubmitting(false);
                                this.context.loginUser(JSON.stringify(data.user))
                                const { history } = this.props;
                                history.push('/');
                            })
                            .catch(error => {
                                console.log("Error",error)
                                if(error.code=="auth/user-not-found"){
                                    this.state.error=true;
                                    this.setState({
                                        spinner:false,
                                        error:true
                                    })
                                    setSubmitting(false);
                                }
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
                            /* and other goodies */
                        }) => (
                                <Form onSubmit={handleSubmit}>
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
                            Usuario y/o contraseña incorrecto        
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

export default withRouter(Login);