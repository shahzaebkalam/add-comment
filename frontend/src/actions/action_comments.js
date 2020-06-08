import { 
  getComments,
  createComment,
  getCommentDetail,
  editGivenComment,
  voteGivenComment,
  deleteGivenComment    
} from '../api_methods'

export const FETCH_COMMENTS = 'fetch_comments'
export const CREATE_NEW_COMMENT = 'create_new_comment'
export const FETCH_GIVEN_COMMENT = 'fetch_given_comment'
export const EDIT_COMMENT = 'edit_comment'
export const VOTE_COMMENT = 'vote_comment'
export const DELETE_COMMENT = 'delete_comment'

export function fetchComments(postId) {
  return {
    type: FETCH_COMMENTS,
    payload: getComments(postId)
  }
}

export function createNewComment(parentId, values, callback) {
  return {
    type: CREATE_NEW_COMMENT,
    payload: createComment(parentId, values, callback)
  }
}

export function fetchGivenComment(id) {
  return { 
    type: FETCH_GIVEN_COMMENT,
    payload: getCommentDetail(id)
  }  
}

export function voteComment(id, option) {
  return {
    type: VOTE_COMMENT,
    payload: voteGivenComment(id, option)
  }
}

export function editComment(id, values, callback) {
  return {
    type: EDIT_COMMENT,
    payload: editGivenComment(id, values, callback)
  }
}

export function deleteComment(id, callback) {
  return {
    type: DELETE_COMMENT,
    payload: deleteGivenComment(id, callback)
  }
}