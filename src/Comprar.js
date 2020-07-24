import React,{Component} from 'react';
import {  Container } from 'react-bootstrap';


class Comprar extends Component{
    constructor(props){
        super(props);
        this.state = {fueComprado: props.fueComprado};

    }


   comprar= () => {
        this.setState({fueComprado: true})
    }


  devolver= () => {
    this.setState({fueComprado: false})     
}   


    render(){
            return(
                <Container>                                 
                 <div>
                    {!this.state.fueComprado &&  
                    <div>
                        <button onClick={this.comprar} class="btn btn-primary">Comprar</button>
                    </div>}
                 </div> 
                 <div>
                    {this.state.fueComprado &&  
                        <div>    
                            <div>
                             <button onClick={this.devolver} class="btn btn-primary">Devolver</button>

                             </div>
                        </div>}
                    </div> 
                </Container>   
                )
            }
                
}
export default Comprar;




                        
                                                       