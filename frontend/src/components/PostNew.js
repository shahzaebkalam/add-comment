import _ from 'lodash'

import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import Header from './Header'
import Navigation from './Navigation'

import { 
  createNewPost  
} from '../actions/action_posts'

import { 
  fetchCategories
} from '../actions/action_categories'

class PostNew extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  renderInput(field) {
    return (
      <div>
        <input { ...field.input } placeholder={ field.placeholder } type='text' className='input' />
        <div className='text-danger'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  renderSelect(field) {
    return (
      <div>
        <select { ...field.input } value={ field.value } />
        <div className='text-danger'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  renderTextarea(field) {
    return (
      <div>
        <textarea { ...field.input } placeholder={ field.placeholder } type='text' className='input input-post' />
        <div className='text-danger'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {  
    this.props.createNewPost(values, () => {
      this.props.history.push('/')  
    }) 
  }

  render() {

    const { handleSubmit, categories } = this.props
    
    const submitButtonStyle = {
      padding: '.8em .8em', 
      backgroundColor: 'lightskyblue',
      color: 'white',
      border: '1px lightgray solid',
      borderRadius: '5px', 
      display: 'block',
      margin: 'auto'
    }

    return ( 
      <div  className="main-container">
        <Header />
        <Navigation 
          route='/' 
          linkText='back to main page'
        /> 
        <div className='main'> 
        <h2>create a new post</h2>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="title" component={ this.renderInput } label='title' type='text' placeholder='title'
          />
          <Field
            name="category" component='select' label='category' className='input select'>
            <option>please choose a category</option>
             { _.map(categories, category => {
              return (
                <option key={category.name} value={category.name}>{category.name}</option>
              )})}
          </Field>
          <Field
            name="body" component={ this.renderTextarea } label='post' placeholder='post'
          />
          <Field
            name="author" component={ this.renderInput } label='author' placeholder='name'
          />
          <button type="submit" style={submitButtonStyle}>submit</button>
        </form>
        </div>
      </div>  
    )
  }
}

function validate(values) {
  const errors = {}

  if(!values.title) {
    errors.title = 'Please enter a title'
  } 
  if(!values.category) {
    errors.category = 'Please choose a category'
  }
  if(!values.body) {
    errors.body = 'Please enter post content'
  }
  if(!values.author) {
    errors.author = 'Please enter your name'
  }

  return errors
}

function mapStateToProps(state) {
  return { 
    categories: state.categories 
  }
}

export default reduxForm({
  validate,
  form: 'new-post'
})(
  connect(mapStateToProps, { 
    createNewPost, 
    fetchCategories 
  })(PostNew)
)