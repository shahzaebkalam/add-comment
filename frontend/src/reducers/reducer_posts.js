import _ from 'lodash'
import { 
  FETCH_POSTS,
  FETCH_GIVEN_POST,
  VOTE_POST,
  DELETE_POST,
  FETCH_CATEGORY_POSTS
} from '../actions'

function posts (state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload, 'id')
    case FETCH_GIVEN_POST:
      return { ...state, [action.payload.id]: action.payload }
    case VOTE_POST:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_POST:
      return _.omit( state, action.payload)
    case FETCH_CATEGORY_POSTS:
      return _.mapKeys(action.payload, 'id')
    default:
      return state
  }
}

export default posts