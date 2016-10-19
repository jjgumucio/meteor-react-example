import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Resumes from '../../imports/api/collections/resumes'
import References from '../../imports/api/collections/references'

/**
 * Meteor uses a "publication/subscription" system to "publish" data to the
 * clients. On the server, we publish data and on the client we subscribe to
 * this data (check: imports/ui/examples/resumes/index.jsx line 81)
 */

// This publication allows clients to access the Resumes documents
Meteor.publishComposite('listResumes', function () {
  /**
   * You should check the clients permission and grant access if appropiate
   * Package recomendation for Roles management: https://github.com/nicolaslopezj/roles
   */
  return {
    find: function () {
      return Resumes.find()
    },
    children: [
      {
        find: function (resume) {
          return References.find({ resumeId: resume._id })
        }
      }
    ]
  }
})

// This publication return a Resume document given its id
Meteor.publishComposite('updateResume', function (resumeId) {
  check(resumeId, String)
  /**
   * You should check the clients permission and grant access if appropiate
   * Package recomendation for Roles management: https://github.com/nicolaslopezj/roles
   */
  return {
    find: function () {
      return Resumes.find(resumeId)
    },
    children: [
      {
        find: function (resume) {
          return References.find(resume._id)
        }
      }
    ]
  }
})
