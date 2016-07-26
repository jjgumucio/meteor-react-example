import {FlowRouter} from 'meteor/kadira:flow-router'
import {mount} from 'react-mounter'

// We import the Home component exported in index.jsx
import Home from './index'

/** Simplest example of a route definition using FlowRouter
 * FlowRouter Docs: https://github.com/kadirahq/flow-router
 */
FlowRouter.route('/', {
  name: 'home', // Optional
  action (params) {
    /**
     * We mount a comeponent when the client access this route
     * Documentation for react-mounter: https://github.com/kadirahq/react-mounter
     */
    mount(Home)
  }
})
