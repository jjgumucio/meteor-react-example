import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import moment from 'moment'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

import Resumes from '../../../api/collections/resumes'
import References from '../../../api/collections/references'

const propTypes = {
  resume: React.PropTypes.object,
  references: React.PropTypes.arrayOf(React.PropTypes.object)
}

class AddReference extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleFormSubmission = this.handleFormSubmission.bind(this)
  }

  handleFormSubmission () {
    References.insert({
      resumeId: this.props.resume._id,
      name: this.refs.name.value,
      validatedSkills: [this.refs.skills.value]
    }, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({open: true})
        FlowRouter.go('list')
      }
    })
  }

  renderAddReference () {
    return (
      <form>
        <p><b>Referred by:</b> <input label='Name' type='text' ref='name' /></p>
        <p><b>Validated Skills:</b> <input label='Skills list' type='text' ref='skills' /></p>
      </form>
    )
  }

  render () {
    if (!this.props.resume) return null
    return (
      <Paper style={{padding: 20}}>
        <h3>Add a reference to the Resume</h3>
        <p><b>First Name:</b> {this.props.resume.firstName}</p>
        <p><b>Birth Date:</b> {moment(this.props.resume.birthday).format('LLL')}</p>
        <p><b>Bio:</b> {this.props.resume.bio}</p>
        {this.renderAddReference()}
        <RaisedButton
          label='add'
          primary
          onTouchTap={this.handleFormSubmission} />
        <Snackbar
          message='Resume created successfully!'
          open={this.state.open}
          autoHideDuration={3000} />
      </Paper>
    )
  }

}

AddReference.propTypes = propTypes

export default createContainer(({resumeId}) => {
  const handler = Meteor.subscribe('updateResume', resumeId)
  const isLoading = !handler.ready() // Returns a boolean
  const resume = Resumes.findOne(resumeId)
  const references = References.find(resumeId).fetch()
  return { resume, references, isLoading }
}, AddReference)
