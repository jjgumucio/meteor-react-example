/**
 * "Hack" to avoid the so called "iOS's dreaded 300ms tap delay" used by
 * browsers to distinguish between a single and a double click
 * More details: http://updates.html5rocks.com/2013/12/300ms-tap-delay-gone-away
 */
import injectTapEventPlugin from 'react-tap-event-plugin'

// Import application route definitions
import '../imports/ui/home/routes'
import '../imports/ui/examples/index' // Rutas internas

injectTapEventPlugin()
