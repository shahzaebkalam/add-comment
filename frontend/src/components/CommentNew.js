import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import Header from './Header'
import Navigation from './Navigation'

import { createNewComment } from '../actions/action_comments'

class CommentNew extends Component {

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
    const { category, id } = this.props.match.params
    this.props.createNewComment(id, values, () => {
      this.props.history.push(`/${category}/${id}`)  
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
          linkText='back to main page'
        />
        <div className="main">
        <h2>create a new comment</h2>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="body" component={ this.renderTextarea } placeholder='comment'
          />
          <Field
            name="author" component={ this.renderInput } placeholder='name'
          />
          <button type="submit" style={submitButtonStyle}>Submit</button>
        </form>
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

export default reduxForm({
  validate,
  form: 'new-comment'
})(
  connect(null, { createNewComment })(CommentNew)
)