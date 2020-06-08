import _ from 'lodash'
import { 
  FETCH_COMMENTS,
  VOTE_COMMENT,
  DELETE_COMMENT
} from '../actions'

function comments (state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS: 
      return _.mapKeys(action.payload, 'id')
    case VOTE_COMMENT:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_COMMENT:
      return _.omit( state, action.payload)
    default:
      return state
  }
}

export default comments