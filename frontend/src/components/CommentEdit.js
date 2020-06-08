import React, { Component } from 'react'
import { Field, reduxForm, initialize } from 'redux-form'
import { connect } from 'react-redux'

import Header from './Header'
import Navigation from './Navigation'

import { 
  editComment,
  fetchGivenComment,
  deleteComment 
} from '../actions/action_comments'

class CommentEdit extends Component {

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchGivenComment(id)
    this.handleInitialize()
  }

  onDeleteClick() {
    const { id, category } = this.props.match.params
    const { parentId } = this.props.comment
    this.props.deleteComment(id, () => {
      this.props.history.push(`/${category}/${parentId}`)
    })
  }

  handleInitialize() {
    if (this.props.comment) {
      const originalComment = {
        'body': this.props.comment.body,
        'author': this.props.comment.author
      }
      this.props.initialize(originalComment)
    }
  }

  renderInput(field) {
    return (
      <div>
        <label>{ field.label }</label>
        <input { ...field.input } placeholder={ field.placeholder } type='text' className='input' />
        <div className='text-danger'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  renderTextarea(field) {
    return (
      <div>
        <label>{ field.label }</label>
        <textarea { ...field.input } placeholder={ field.placeholder } type='text' className='input input-post' />
        <div className='text-danger'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    const { id, category } = this.props.match.params
    const { parentId } = this.props.comment
    this.props.editComment(id, values, () => {
      this.props.history.push(`/${category}/${parentId}`)  
    }) 
  }

  render() {

    const { handleSubmit } = this.props

    const submitButtonStyle = {
      padding: '.8em .8em', 
      backgroundColor: 'lightskyblue',
      color: 'white',
      border: '1px lightgray solid',
      borderRadius: '5px', 
      display: 'block',
      margin: 'auto',
      marginTop: '10px'
    }

    return ( 
      <div className="main-container">
        <Header />
        <Navigation 
          route='/' 
          linkText='back to main page without updating'
        />
        <div className="main">
        <h2>edit comment</h2>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="body" component={ this.renderTextarea } placeholder='comment'
          />
          <Field
            name="author" component={ this.renderInput } placeholder='name'
          />
          <button type="submit" style={submitButtonStyle}>Update</button>
        </form>
        <button
          style={submitButtonStyle}
          onClick={ this.onDeleteClick.bind(this) }
        >Delete</button>
        </div>
      </div>  
    )
  }
}

function validate(values) {
  const errors = {}
 
  if(!values.body) {
    errors.body = 'Please enter post content'
  }
  if(!values.author) {
    errors.author = 'Please enter your name'
  }

  return errors
}

function mapStateToProps(state, ownProps) {
  return {
    comment: state.comments[ownProps.match.params.id]
  }
}

export default reduxForm({
  validate,
  form: 'edit-comment'
})(
  connect(mapStateToProps, { editComment, fetchGivenComment, deleteComment })(CommentEdit)
)