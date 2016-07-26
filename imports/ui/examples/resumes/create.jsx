import { Meteor } from 'meteor/meteor'
import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

const propTypes = {

}

const defaultProps = {

}

export default class Create extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      saveMessage: false
    }
    this.submitForm = this.submitForm.bind(this)
  }

  submitForm () {
    // Usamos un método para el guardado del form solo para desmostrar el uso
    // de los métodos. Podríamos haber hecho el update desde aquí mismo
    const inputValues = {
      firstName: this.refs.firstName.value,
      birthday: this.refs.birthday.value,
      bio: this.refs.bio.value
    }
    Meteor.call('createResume', inputValues, (error, response) => {
      if (error) {
        alert(error.details)
        console.log(error)
      }

      this.setState({saveMessage: true})
    })
  }

  render () {
    return (
      <Paper style={{padding: 20}}>
        <h1>Create Resume</h1>
        <form>
          <p><b>First Name:</b> <input label='First Name' type='text' ref='firstName' /></p>
          <p><b>Birthday:</b> <input label='Birthday' type='date' ref='birthday' /></p>
          <p><b>Bio:</b> <textarea label='Bio' ref='bio' rows='5' cols='50'></textarea></p>
          <RaisedButton
            primary
            label='guardar'
            onTouchTap={this.submitForm} />
        </form>

        <Snackbar
          message='Resume created successfully!'
          open={this.state.saveMessage}
          autoHideDuration={3000} />
      </Paper>
    )
  }

}

Create.propTypes = propTypes
Create.defaultProps = defaultProps
