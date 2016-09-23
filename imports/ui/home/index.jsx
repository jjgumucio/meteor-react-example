import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'

/**
 * Simplest example of a React compenent.
 * A React component needs only a render method. This method must return the
 * HTML dom of the component
 */
export default class Home extends React.Component {
  render () {
    return (
      <div>
        <h1>Meteor with React</h1>
        <p>
          Welcome to the example of Meteor with react.
        </p>
        <h2>
          Browse the examples
        </h2>
        <h4>
          Forms with simple schema
        </h4>
        <ul>
          <li>
            <a href={FlowRouter.path('list')}>
              Using React for simple CRUD like components
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
