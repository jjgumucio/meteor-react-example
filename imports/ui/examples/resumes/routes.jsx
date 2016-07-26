import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'
import {mount} from 'react-mounter'

import Layout from './layout'
import Index from './index'
import Update from './update'
import Create from './create'

// Documentación FlowRouter: https://github.com/kadirahq/flow-router
FlowRouter.route('/resumes', {
  name: 'list',
  action () {
    mount(Layout, {  // Montamos un componente y le pasamos un objecto con sus props
      content () {  // definimos la función 'content' que pasará como prop al componente Layout
        return <Index />  // Retornamos un componente que será montado como parte del layout
      }
    })
  }
})

FlowRouter.route('/resumes/create', {
  name: 'create',
  action () {
    mount(Layout, {
      content () {
        return <Create />
      }
    })
  }
})

FlowRouter.route('/resumes/:resumeId', {  // resumeId es una parámetro de la ruta.
  name: 'update',                         // podemos hacer opcional el parámetro: ':resumeId?'
  action ({resumeId}) {
    mount(Layout, {
      content () {
        return <Update resumeId={resumeId} />
      }
    })
  }
})
