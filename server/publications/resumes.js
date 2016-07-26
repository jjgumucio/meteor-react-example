import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Resumes from '../../imports/api/collections/resumes'

// Publicación para acceder a todos los Resume
Meteor.publish('listResumes', function () {
  // Debiesemos chequear los permisos del usuario
  // Recomendación: https://github.com/nicolaslopezj/roles

  return Resumes.find()
})

// Publicación para obtener un Resume dado su id
Meteor.publish('updateResume', function (resumeId) {
  check(resumeId, String)
  // Debiesemos chequear los permisos del usuario
  // Recomendación: https://github.com/nicolaslopezj/roles

  return Resumes.find(resumeId)
})
