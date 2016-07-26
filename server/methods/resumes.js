import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Resumes from '../../imports/api/collections/resumes'

Meteor.methods({
  // Mótodo de muestra, se usan para ejecutar funcionalidad en el servidad y
  // opcionalmente devolverle algo al cliente.
  // En un método puedo, jugar con la DB, llamar APIs, manejar/procesar datos, etc
  'createResume': function ({firstName, birthday, bio}) {
    check(firstName, String)
    check(birthday, String)
    check(bio, String)

    return Resumes.insert({firstName, birthday, bio})
  }
})
