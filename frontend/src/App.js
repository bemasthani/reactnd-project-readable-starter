import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Header from './components/common/Header'
import AddPost from './components/posts/AddPost'
import Home from './components/Home'
import Category from './components/categories/Category';
import Post from './components/posts/Post';
import EditPost from './components/posts/EditPost';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
          <div className="app-content">
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/add-post" component={AddPost}></Route>
                <Route path="/post/:postId" component={Post}></Route>
                <Route path="/post-edit/:postId" component={EditPost}></Route>
                <Route exact path="/:currentCategory" component={Category}></Route>
                <Route exact path="/:currentCategory/:postId" component={Post}></Route>
              </Switch>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
