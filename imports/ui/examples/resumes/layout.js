import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Define the props (properties/params) that this component will need/use
const propTypes = {
  // Prop validation (it's not enforced)
  content: React.PropTypes.func.isRequired
}

export default class Layout extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <MuiThemeProvider>
        <div style={styles.container}>
          {this.props.content()}
        </div>
      </MuiThemeProvider>
    )
  }

}

const styles = {
  container: {
    paddingTop: 60,
    maxWidth: 600,
    margin: '0 auto 0 auto'
  }
}

Layout.propTypes = propTypes
