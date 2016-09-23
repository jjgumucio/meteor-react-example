import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import {FlowRouter} from 'meteor/kadira:flow-router'
import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

import Resumes from '../../../api/collections/resumes'

// Define the props (propeties/params) that this component will need/use
const propTypes = {
  resume: React.PropTypes.object,
  isLoading: React.PropTypes.bool
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
    Resumes.update({_id: this.props.resume._id}, {$set: inputValues}, (error, response) => {
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

  formatDate () {
    const month = this.props.resume.birthday.getMonth() + 1
    const day = this.props.resume.birthday.getDate()

    const dateArray = [
      this.props.resume.birthday.getFullYear(),
      month > 9 ? month : '0' + month.toString(),
      day > 9 ? day : '0' + day.toString()
    ]

    return dateArray.join('-')
  }

  // The render method is the only required one. It must return classic DOM hierachy
  render () {
    // If the prop "resume" is not loaded yet, we can show a Loading component for example
    if (this.props.isLoading) return (<div>Loading...</div>)
    return (
      // We are using Material-ui components: http://www.material-ui.com/
      <Paper style={{padding: 20, marginBottom: 10}}>
        <h1>Update Resume</h1>
        <form>
          <p>
            <b>First Name:</b>
            <input label='First Name' type='text' ref='firstName' defaultValue={this.props.resume.firstName} />
          </p>
          <p>
            <b>Birthday:</b>
            <input label='Birthday' type='date' ref='birthday' defaultValue={this.formatDate(this.props.resume.birthday)} />
          </p>
          <p>
            <b>Bio:</b>
            <textarea label='Bio' ref='bio' rows='5' cols='50' defaultValue={this.props.resume.bio}></textarea>
          </p>
        </form>
        <RaisedButton
          primary
          label='guardar'
          onTouchTap={this.submitForm} />
        <RaisedButton
          style={{marginLeft: 20}}
          secondary
          label='delete'
          onTouchTap={this.deleteResume} />
        <RaisedButton
          style={{marginLeft: 20}}
          label='volver'
          onTouchTap={() => FlowRouter.go('list')} />

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
// obtener los datos desde el server. Nos suscribimos a las publicaciones necesarias,
// hacemos querys y retornamos.
// La función inyecta los datos como 'props' al componente Update
export default createContainer(({resumeId}) => {
  const handler = Meteor.subscribe('updateResume', resumeId)
  const isLoading = !handler.ready() // Returns a boolean
  const resume = Resumes.findOne(resumeId)
  return { resume, isLoading }
}, Update)
