
import React from 'react';
//import Login from './Login';
import { Link } from 'react-router-dom'
import { Navbar,  Nav,Alert,Container} from 'react-bootstrap';
import NetContext from './Context/NetContext';

const Menu = ()=>{
  const mensajeLogin = (context)=>{
      setTimeout(()=>{context.setNewLogin(false)}, 5000)
  }
  return(
      <NetContext.Consumer>
          {context => (               
                <>
              <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Mercacho Libre</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                  {context.login && 
                    <>                    
                    <Nav.Link onClick={context.logout}>Logout</Nav.Link>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                    <Nav.Link as={Link} to="/registroproducto/">Alta Productos</Nav.Link>
                    <Nav.Link as={Link} to="/usuarios/">Usuarios</Nav.Link>
                    <Nav.Link as={Link} to="/addusuarioscreen/">Alta Usuarios</Nav.Link>
                    </>
                        }
                        {!context.login && 
                            <>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                            </>
                        }
                  </Nav>
                    
                </Navbar.Collapse>
                </Navbar>
                <Container>
                {context.newLogin && 
                  <>
                    <Alert variant={'info'}>
                       Bienvenido/a        
                    </Alert>
                    {mensajeLogin(context)}
                 </>
                }    
                </Container>
                </>

            )}
        </NetContext.Consumer>
        
    )
}

export default Menu;