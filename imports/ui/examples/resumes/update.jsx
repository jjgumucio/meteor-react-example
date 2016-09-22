import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import {FlowRouter} from 'meteor/kadira:flow-router'
import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

import Resumes from '../../../api/collections/resumes'

// Define the props that the component requires
const propTypes = {
  resume: React.PropTypes.object.isRequired
}

const defaultProps = {

}

// Define the component as a Class, extending React.Component
class Update extends React.Component {

  // Class constructor
  constructor (props) {
    super(props)
    // Set the components initial state
    this.state = {
      saveMessage: false
    }
    // Bind "this" object (reference to the component itself) to the components methods
    this.submitForm = this.submitForm.bind(this)
    this.deleteResume = this.deleteResume.bind(this)
  }

  // Define methods for this class
  submitForm () {
    // Here we do a "direct update" from the client instead of using a method
    const inputValues = {
      firstName: this.refs.firstName.value,
      birthday: this.refs.birthday.value,
      bio: this.refs.bio.value
    }
    Resumes.update({_id: this.props.resume._id}, inputValues, (error, response) => {
      if (error) {
        console.log(error)
      }

      this.setState({saveMessage: true})
    })
  }

  deleteResume () {
    Resumes.remove({_id: this.props.resume._id}, (error, response) => {
      if (error) {
        console.log(error)
      }

      FlowRouter.go('list')
    })
  }

  // The render method is the only required one. It must return classic DOM hierachy
  render () {
    return (
      // We are using Material-ui components: http://www.material-ui.com/
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
  return { resume }
}, Update)
