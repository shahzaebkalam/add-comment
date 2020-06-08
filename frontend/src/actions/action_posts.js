import { 
  getPosts,
  createPost,
  getPostDetail,
  editGivenPost,
  voteGivenPost,
  deleteGivenPost,
  fetchGivenCategoryPosts
} from '../api_methods'

export const FETCH_POSTS = 'fetch_posts'
export const CREATE_NEW_POST = 'create_new_post'
export const FETCH_GIVEN_POST = 'fetch_given_post'
export const EDIT_POST = 'edit_post'
export const VOTE_POST = 'vote_post'
export const DELETE_POST = 'delete_post'
export const FETCH_CATEGORY_POSTS = 'fetch_category_posts'

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    payload: getPosts()
  }
}

export function createNewPost(values, callback) {
  return {
    type: CREATE_NEW_POST,
    payload: createPost(values, callback)
  }
}

export function fetchGivenPost(id) {
  return {
    type: FETCH_GIVEN_POST,
    payload: getPostDetail(id)
  }
}

export function editPost(id, values, callback) {
  return {
    type: EDIT_POST,
    payload: editGivenPost(id, values, callback)
  }
}

export function votePost(id, option) {
  return {
    type: VOTE_POST,
    payload: voteGivenPost(id, option)
  }
}

export function deletePost(id, callback) {
  return {
    type: DELETE_POST,
    payload: deleteGivenPost(id, callback)
  }
}

export function fetchCategoryPosts(category) {
  return {
    type: FETCH_CATEGORY_POSTS,
    payload: fetchGivenCategoryPosts(category)
  }
}