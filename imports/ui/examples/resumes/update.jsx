import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import {FlowRouter} from 'meteor/kadira:flow-router'
import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

import Resumes from '../../../api/collections/resumes'

// Definimos las props (propiedades) que requiere el componente
const propTypes = {
  resume: React.PropTypes.object.isRequired
}

const defaultProps = {

}

// Definimos el componente como clase, extendiendo la clase Component de React
class Update extends React.Component {

  // Constructor de la clase (JS clásico)
  constructor (props) {
    super(props)
    // Seteamos el estado inicial del componente
    this.state = {
      saveMessage: false
    }
    // Bindeamos el objeto this (el componente mismo) a los métodos del componente
    this.submitForm = this.submitForm.bind(this)
    this.deleteResume = this.deleteResume.bind(this)
  }

  // Declaramos métodos para el componente
  submitForm () {
    // Hacemos el update directo desde el cliente sin usar un método
    const inputValues = {
      firstName: this.refs.firstName.value,
      birthday: this.refs.birthday.value,
      bio: this.refs.bio.value
    }
    Resumes.update({_id: this.props.resume._id}, inputValues, (error, response) => {
      if (error) {
        alert(error.details)
        console.log(error)
      }

      this.setState({saveMessage: true})
    })
  }

  deleteResume () {
    Resumes.remove({_id: this.props.resume._id}, (error, response) => {
      if (error) {
        alert(error.details)
        console.log(error)
      }

      FlowRouter.go('list')
    })
  }

  // Método render que debe retornar un elemento HTML clásico
  render () {
    return (
      // Usamos compoentes de material-ui
      // Documentación Material-ui: http://www.material-ui.com/
      <Paper style={{padding: 20, marginBottom: 10}}>
        <h1>Update Resume</h1>
        <form>
          <p>
            <b>First Name:</b>
            <input label='First Name' type='text' ref='firstName' value={this.props.resume.firstName} />
          </p>
          <p>
            <b>Birthday:</b>
            <input label='Birthday' type='date' ref='birthday' value={this.props.resume.birthday} />
          </p>
          <p>
            <b>Bio:</b>
            <textarea label='Bio' ref='bio' rows='5' cols='50' value={this.props.resume.bio}></textarea>
          </p>
          // RaisedButton es un componente de Material-ui
          <RaisedButton style={{marginRight: 20}}
            primary
            label='guardar'
            onTouchTap={this.submitForm} />
          <RaisedButton
            secondary
            label='delete'
            onTouchTap={this.deleteResume} />
        </form>

        <Snackbar
          message='Resume updated successfully!'
          open={this.state.saveMessage}
          autoHideDuration={3000} />
      </Paper>
    )
  }
}

Update.propTypes = propTypes
Update.defaultProps = defaultProps

// El componente Update es "inteligente", usamos la función 'createContainer' para
// obtener los datos desde el server. Nos suscribimos a las publicaciónes necesarias,
// hacemos querys y retornamos.
// La función inyecta los datos como 'props' al componente Update
export default createContainer(({resumeId}) => {
  Meteor.subscribe('updateResume', resumeId)
  const resume = Resumes.findOne(resumeId)
  console.log('resume:', resume)
  return { resume }
}, Update)
