import {Meteor} from 'meteor/meteor'

// Define a colection using Meteor wrapper for Mongo collections
const References = new Meteor.Collection('references')

/** Assign a schema for the model using for validation using SimpleSchema:
 *  https://github.com/aldeed/meteor-simple-schema
 */
References.attachSchema({
  resumeId: {
    type: String,
  },
  name: {
    type: String,
    label: 'Name of referral'
  },
  validatedSkills: {
    type: [String],
    label: 'Skills validated',
    optional: true
  }
})

export default References
