import React from 'react'
import AddUsuarioForm from './AddUsuarioForm'

export default class AddUsuarioScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Alta de Usuario',
  }

  handleSubmit = formState => {

  }

  render() {
    return <AddUsuarioForm titulo={'Nuevo Usuario'} onSubmit={this.handleSubmit} />
  }
}
