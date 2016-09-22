import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Resumes from '../../imports/api/collections/resumes'

/**
 * Methods are used to run code on the server and optionally, send a response
 * to the client (ex: APIs, do computations, work with the DB, etc).
 * In Meteor, methods are functions defined as values of a simple
 * object that is in turn, passed to the Meteor.methods function
 */
Meteor.methods({
  'createResume': function ({firstName, birthday, bio}) {
    check(firstName, String)
    check(birthday, String)
    check(bio, String)

    return Resumes.insert({firstName, birthday, bio})
  }
})
