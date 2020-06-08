import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Header from './Header'
import Navigation from './Navigation'

import { 
  fetchGivenPost, 
  votePost,
  deletePost
} from '../actions/action_posts'

import {
  fetchComments,
  voteComment
} from '../actions/action_comments'


class PostDetail extends Component {

  componentDidMount() {  
      const { id } = this.props.match.params
      this.props.fetchGivenPost(id)
      this.props.fetchComments(id)
  }

  onDeleteClick() {
    const { id } = this.props.match.params
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
  }

  renderPostDetails() {   
    const { post, votePost, comments } = this.props
    
    return (
         <div className="post-card">
           <h3 className="post-title">{post.title}</h3>          
           <div className="post-body">{post.body}</div>
           <div>
            <div className="post-data-item">{`Posted by: ${post.author}`}</div>
            <div className="post-data-item">{`Score: ${post.voteScore}`}</div>
            <div className="post-data-item">{`Number of comments: ${comments.length}`}</div>
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
            <Link 
              to={`/posts/edit/${post.id}`} 
              className="btn-updown"
              >edit</Link>         
            <button
              className="btn-updown"
              onClick={ this.onDeleteClick.bind(this) }
              >delete</button>
           </div>
         </div>
    )
  }

  renderCommentList() {
    const { comments, post, voteComment } = this.props
    if (!comments) {
      return (<div>Loading...</div>)
    }
    
    return _.map(comments, (comment, id) => {
      return (
        <li key={comment.id} className="post-card">
          <div className="post-body">{comment.body}</div>
          <div>
            <div className="post-data-item">{comment.author}</div>
            <div className="post-data-item">{`Score: ${comment.voteScore}`}</div>
          </div>
          <div className="btn-vote">
            <button
              className="btn-updown"
              onClick={() => voteComment(comment.id, 'upVote')}
              >upvote</button>
            <button
              className="btn-updown"
              onClick={() => voteComment(comment.id, 'downVote')}
              >downvote</button>
            <Link 
              to={`/comment/edit/${comment.id}/${post.category}`}
              className="btn-updown"
              >edit or delete</Link> 
          </div>
        </li>
      )
    })
  }

  render() {

    const { post } = this.props

    if(!post) {
      return <div>Loading...</div>
    }

    return ( 
      <div className="main-container">
        <Header pageHeader='selected post'/>
        <Navigation 
          route='/' 
          linkText='back to the main page'
        /> 
        <Navigation 
          route={`/commentto/${post.id}/${post.category}`} 
          linkText='add comment'
        /> 
        <div className="main">
          <div className="post-container">{ this.renderPostDetails() }</div>
          <h3>comments</h3>
          <ul>{ this.renderCommentList() }</ul>
          
        </div>
      </div>
    )
  }
}

PostDetail.propTypes = {
  fetchGivenPost: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired,
  voteComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return { 
    post: state.posts[ownProps.match.params.id], 
    comments: _.filter(state.comments, {'parentId': ownProps.match.params.id})
  }
}

export default connect(mapStateToProps, { 
  fetchGivenPost,
  fetchComments,
  votePost,
  voteComment,
  deletePost
})(PostDetail)