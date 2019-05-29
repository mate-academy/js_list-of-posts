'use strict';

function doFetch(url) {
  return fetch(url).then(response => response.json());
}

const postsStream = document.getElementById('posts-stream');

const posts = doFetch('https://jsonplaceholder.typicode.com/posts');
const users = doFetch('https://jsonplaceholder.typicode.com/users');
const comments = doFetch('https://jsonplaceholder.typicode.com/comments');

Promise.all([posts, users, comments]).then((result) => {
  const [ posts, users, comments ] = result;
  posts.forEach(post => {
    postsStream.append(createPost(post, users, comments))
  })
})

function createElement(text = '', classes = [], type = 'div') {
  const element = document.createElement(type);
  element.textContent = text;
  classes.forEach(styleClass => element.classList.add(styleClass));
  return element;
}

function createComment(comment) {
  const wrapper = createElement('', ['comment__wrapper', 'comment__element']);
  const title = createElement(comment.name, ['comment__title', 'comment__element']);
  const ownerEmail = createElement(comment.email, ['comment__email', 'comment__element']);
  const body = createElement(comment.body, ['comment__body', 'comment__element']);
  wrapper.append(title, ownerEmail, body);

  return wrapper;
}

function createCommentsBlock(post, comments) {
  const commentsToPost = comments.filter(comment => post.id === comment.postId);
  const commentsWrapper = createElement('', ['comments__wrapper', 'comments__wrapper_hidden']);
  commentsToPost.forEach(comment => {
    commentsWrapper.append(createComment(comment));
  })

  return commentsWrapper;
}

function createPost(post, users, comments) {

  const postWrapper = createElement('', ['post__wrapper', 'post__element']);
  const postTitle = createElement(post.title, ['post__title', 'post__element']);
  const postBody = createElement(post.body, ['post__body', 'post__element']);
  const postOwner = users.find(user => user.id === post.userId) || {name: 'Anonymous'};
  const postOwnerTitle = createElement(postOwner.name, ['post__owner', 'post__element']);
  const commentsButton = createElement('Show/hide comments', ['comments__button', 'post__element'], 'button');
  const commentsBlock = createCommentsBlock(post, comments);

  postWrapper.append(postTitle, postBody, postOwnerTitle, commentsButton, commentsBlock);
  return postWrapper;
}

const hideComments = event => {
  const { target } = event;
  
  if (target.classList.contains('comments__button')) {
    const post = target.closest('.post__wrapper');
    const comments = post.querySelector('.comments__wrapper');
    comments.classList.toggle('comments__wrapper_hidden');
  }
}

document.addEventListener('click', hideComments);