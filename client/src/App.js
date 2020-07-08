import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'
import Join from './component/Join/Join'
import Chat from './component/Chat/Chat'

const App = () => (
    <Router>
        <Route path='/' exact component={Join}></Route>
        <Route path='/chat' component={Chat}></Route>

    </Router>
);

export default App;





