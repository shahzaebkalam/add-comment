import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import posts from './reducer_posts'
import categories from './reducer_categories'
import comments from './reducer_comments'

const rootReducer = combineReducers({ 
  posts,
  comments,
  categories,
  form: formReducer
})

export default rootReducer