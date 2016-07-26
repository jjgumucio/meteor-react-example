import {Meteor} from 'meteor/meteor'

// Define a colection using Meteor wrapper for Mongo collections
const Resumes = new Meteor.Collection('resumes')

/** Assign a schema for the model using for validation using SimpleSchema:
 *  https://github.com/aldeed/meteor-simple-schema
 */
Resumes.attachSchema({
  firstName: {
    type: String,
    label: 'First Name',
    optional: true
  },
  birthday: {
    type: Date,
    label: 'Birthday',
    optional: true
  },
  bio: {
    type: String,
    label: 'Bio',
    optional: true
  }
})

export default Resumes
