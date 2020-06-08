import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import MainSection from './components/MainSection'
import CategoryView from './components/CategoryView'
import PostDetail from './components/PostDetail'
import PostNew from './components/PostNew'
import PostEdit from './components/PostEdit'
import CommentNew from './components/CommentNew'
import CommentEdit from './components/CommentEdit'
import NoMatch from './components/NoMatch'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() => (
            <MainSection />
          )}/>
          <Route exact path='/:category' component={ CategoryView } />
          <Route exact path='/posts/new' component={ PostNew } />
          <Route exact path='/commentto/:id/:category' component={ CommentNew } />
          <Route exact path='/posts/edit/:id' component={ PostEdit } />
          <Route exact path='/comment/edit/:id/:category' component={ CommentEdit } />
          <Route exact path='/:category/:id' component={ PostDetail } />
          <Route component={ NoMatch } />
        </Switch>
      </div>
    )
  }
}

export default App
