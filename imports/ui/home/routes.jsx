import {FlowRouter} from 'meteor/kadira:flow-router'
import {mount} from 'react-mounter'

import Home from './index'

/** Simplest example of a route definition using FlowRouter
 * FlowRouter Docs: https://github.com/kadirahq/flow-router
 */
FlowRouter.route('/', {
  name: 'home', // Optional
  action (params) {
    mount(Home) // Mounts a component
  }
})
