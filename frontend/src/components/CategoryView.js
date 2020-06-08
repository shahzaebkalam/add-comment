import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Header from './Header'
import Navigation from './Navigation'

import { 
  fetchCategoryPosts,
  votePost 
} from '../actions/action_posts'


class CategoryView extends Component {

  componentDidMount() {
    const { category } = this.props.match.params
    this.props.fetchCategoryPosts(category)
  }

  renderCategoryPostList() {
    const { posts, votePost } = this.props

    return _.map(posts, post => {
      return (
        <li key={post.id} className="post-card">
          <Link className="post-title" to={`/${post.category}/${post.id}`}><h3>{post.title}</h3></Link>
          <div>
            <div className="post-data-item">{`posted by: ${post.author}`}</div>
            <div className="post-data-item">{`score: ${post.voteScore}`}</div>
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

    const { category } = this.props.match.params

    return ( 
      <div className="main-container">
        <Header pageHeader={`posts in category: ${category}`}/>
        <Navigation 
          route='/' 
          linkText='back to main page'
        />
        <div className="main">
          <ul>{ this.renderCategoryPostList() }</ul>
        </div>
      </div>
    )
  }
}

CategoryView.propTypes = {
  fetchCategoryPosts: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { 
  fetchCategoryPosts,
  votePost
})(CategoryView)
