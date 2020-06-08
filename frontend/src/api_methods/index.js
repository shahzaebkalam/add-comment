import uuid from 'uuid'

const url = 'http://localhost:3001'

const token = 'laszlo'

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}


export const getPosts = () => 
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())


export const createPost = (post, callback) =>
  fetch(`${url}/posts`, {
    method: 'POST', 
    headers,
    body: JSON.stringify({
      ...post,
      id: uuid(),
      timestamp: Date.now()
    })
  })
  .then(res => res.json())
  .then(() => callback())


export const getPostDetail = (postId) =>
  fetch(`${url}/posts/${postId}`, { headers })
    .then(res => res.json())


export const editGivenPost = (id, post, callback) =>
    fetch(`${url}/posts/${id}`, {
      method: 'PUT', 
      headers,
      body: JSON.stringify({
        ...post,
        timestamp: Date.now()
      })
    })
    .then(res => res.json())
    .then(() => callback())


export const voteGivenPost = (id, option) =>
    fetch(`${url}/posts/${id}`, {
      method: 'POST', 
      headers,
      body: JSON.stringify({ option })
    })
    .then(res => res.json())


export const deleteGivenPost = (postId, callback) =>
  fetch(`${url}/posts/${postId}`, { 
    method: 'DELETE',
    headers
  })
    .then(() => callback())


export const fetchGivenCategoryPosts = (category) =>
  fetch(`${url}/${category}/posts`, { headers })
    .then(res => res.json())



//fetch the category list
export const getCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())

//fetch comments to given post
export const getComments = (postId) =>
  fetch(`${url}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

//create new comment
export const createComment = (postId, comment, callback) =>
  fetch(`${url}/comments`, {
    method: 'POST', 
    headers,
    body: JSON.stringify({
      ...comment,
      id: uuid(),
      timestamp: Date.now(),
      parentId: postId
    })
  })
  .then(res => res.json())
  .then(() => callback())


//fetch given comment  --> a: fetchGivenComment
export const getCommentDetail = (id) =>
  fetch(`${url}/comments/${id}`, { headers })
    .then(res => res.json())

//edit given comment --> a: editComment
export const editGivenComment = (id, comment, callback) =>
  fetch(`${url}/comments/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      ...comment,
      timestamp: Date.now()
    })
  })
  .then(res => res.json())
  .then(() => callback())


export const voteGivenComment = (id, option) =>
  fetch(`${url}/comments/${id}`, {
    method: 'POST', 
    headers,
    body: JSON.stringify({ option })
  })
  .then(res => res.json())


//delete given comment  --> a: deleteComment
export const deleteGivenComment = (id, callback) =>
  fetch(`${url}/comments/${id}`, { 
    method: 'DELETE',
    headers 
  })
  .then(() => callback())