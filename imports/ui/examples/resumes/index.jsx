/**
 * List view of the Resumes.
 */

import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { FlowRouter } from 'meteor/kadira:flow-router'
import _ from 'underscore'
import moment from 'moment'
import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import Resumes from '../../../api/collections/resumes'

/**
 * Definition of the Index component that will use the data "inyected" by the
 * createContainer function
 * Define the props (propeties/params) that this component will need/use.
 */
const propTypes = {
  /**
   * Prop validation (it's not enforced)
   * Props can be accessed in the componet using "this.props.propName".
   * This component uses an array of Resume objects
   */
  resumes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

class ResumesList extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  renderNoResumes () {
    return (
      <h3>No Resumes yet!</h3>
    )
  }

  renderResumes () {
    return _.map(this.props.resumes, resume => {
      /**
       * This section could be in its own component, imported and used here
       * Heres some homework!
       */
      return (
        <Paper style={{padding: 20, marginBottom: 10}} key={resume._id}>
          <p><b>First Name:</b> {resume.firstName}</p>
          <p><b>Birth Date:</b> {moment(resume.birthday).format('LLL')}</p>
          <p><b>Bio:</b> {resume.bio}</p>
          <RaisedButton
            label='update'
            secondary
            onTouchTap={() => FlowRouter.go('update', {resumeId: resume._id})} />
        </Paper>
      )
    })
  }

  render () {
    return (
      <Paper style={{padding: 20}}>
        <h3>Listing of Resumes</h3>
        {this.props.resumes.length ? this.renderResumes() : this.renderNoResumes()}
        <RaisedButton
          label='create'
          primary
          onTouchTap={() => FlowRouter.go('create')} />
      </Paper>
    )
  }
}

// We assign the defined props to this component
ResumesList.propTypes = propTypes

/**
 * createContainer function is used to fetch and inject data from the DB.
 * Components should be "dumb" and presentational only.
 * This function subscribes to N publications, queries the DB and returns the
 * data in the form of 'props' (object). It inyects this props to the passed in component,
 * in this case: Index
 */
export default createContainer(() => {
  Meteor.subscribe('listResumes')
  const resumes = Resumes.find().fetch()
  console.log('resumes:', resumes)
  return { resumes }
}, ResumesList)
