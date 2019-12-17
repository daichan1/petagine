import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'
import Index from './pages/index'
import Show from './pages/show'
import New from './pages/new'
import Edit from './pages/edit'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Router>
    <Route path="/" exact component={Index} />
    <Route path="/books" exact component={Index} />
    <Route path="/books/new" exact component={New} />
    <Route path="/books/:id/show" exact component={Show} />
    <Route path="/books/:id/edit" exact component={Edit} />
  </Router>,
  document.getElementById('root')
)

serviceWorker.unregister()
