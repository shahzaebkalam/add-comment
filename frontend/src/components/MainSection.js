import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Header from './Header'
import Navigation from './Navigation'
import Categories from './Categories'

import { 
  fetchPosts,
  votePost
 } from '../actions/action_posts'


class MainSection extends Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  renderPostList() {
    const { posts, votePost } = this.props
    
    if (!posts) {
      return (<div>Loading...</div>)
    }
    
    return _.map(posts, post => {
      return (
        <li key={post.id} className="post-card">
          <Link className="post-title" to={`/${post.category}/${post.id}`}><h3>{post.title}</h3></Link>
          <div>
            <div className="post-data-item">{`posted by: ${post.author}`}</div>
            <div className="post-data-item">{`score: ${post.voteScore}`}</div>
            <div className="post-data-item">number of comments: </div>
          </div>
          <div className="btn-vote">
            <button
              className="btn-updown"
              onClick={() => votePost(post.id, 'upVote')}
              >upvote</button>
            <button
              className="btn-updown"
              onClick={() => votePost(post.id, 'downVote')}
              >downvote</button>
          </div>
        </li>
      )
    })
  }

  render() {
    console.log(this.props.posts)
    return (
      <div className="main-container">
        <Header pageHeader='posts'/>
        <Navigation 
          route='/posts/new' 
          linkText='add new post'
        />       
        <div className="aside">
          <div className="sort-container">
            <h3>posts sort by</h3>
            <button className="btn btn-content">date</button>
            <button className="btn btn-content">score</button>
          </div>
          <Categories />
        </div>
        <div className="main"> 
          <div className="post-container">
            <ul>{ this.renderPostList() }</ul>
          </div>
        </div>
      </div>
    )
  }
}

MainSection.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    posts: _(state.posts)
      .sortBy('voteScore')
      .value()
      .reverse()
  }
}

export default connect(mapStateToProps, { 
  fetchPosts,
  votePost 
})(MainSection)