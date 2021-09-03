import ReactDOM from 'react-dom'

import {Foo} from './Foo'

//

function start() {
    // render
    ReactDOM.render(<Foo />, document.getElementById('app'))
}

start()
