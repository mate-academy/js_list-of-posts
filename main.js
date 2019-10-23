'use strict';
let container;
let errorInfo;

const requestPosts = new XMLHttpRequest();
const requestUsers = new XMLHttpRequest();
const requestComments = new XMLHttpRequest();
let posts;
let users;
let comments;

function getUser(users, userId) {
  return users.find((user)=> {
    return user.id === userId;
  });
}

function getPostComments(comments, postId) {
  return comments.filter((comment)=> {
    return comment.postId === postId;
  });
}

function commentsLoadHandler() {
  if (requestComments.status !== 200) {
    errorInfo.textContent = `Error get user table: ${requestComments.status}`;
    return;
  }
  comments = JSON.parse(requestComments.responseText);

  let user;
  let postComments;

  posts.forEach((post) => {
    user = getUser(users, post.userId);
    postComments = getPostComments(comments, post.id);

    const postTitle = document.createElement('h2');
    const postBody = document.createElement('span');
    postBody.classList.add('postbody');
    const postAuthor = document.createElement('h3');
    const postCommentsContainer = document.createElement('div');

    postTitle.textContent = post.title;
    postBody.textContent = post.body;
    postAuthor.textContent = user.name;

    postComments.forEach((postComment) => {
      const postCommentEl = document.createElement('span');
      const commentAuthor = document.createElement('h6');

      postCommentEl.textContent = postComment.body;
      commentAuthor.textContent = postComment.name;
      postCommentsContainer.append(postCommentEl, commentAuthor);
    })

    container.append(postTitle, postBody, postAuthor, postCommentsContainer);
  });
}

function usersLoadHandler() {
  if (requestUsers.status !== 200) {
    errorInfo.textContent = `Error get user table: ${requestUsers.status}`;
    return;
  }
  users = JSON.parse(requestUsers.responseText);
  requestComments.open('GET', 'https://jsonplaceholder.typicode.com/comments');
  requestComments.addEventListener('load', commentsLoadHandler);
  requestComments.send();
}

function postsLoadHandler() {
  if (requestPosts.status !== 200) {
    errorInfo.textContent = `Error get user table: ${requestPosts.status}`;
    return;
  }
  posts = JSON.parse(requestPosts.responseText);

  requestUsers.open('GET', 'https://jsonplaceholder.typicode.com/users');
  requestUsers.addEventListener('load', usersLoadHandler);
  requestUsers.send();
}



function contentHandler() {
  container = document.querySelector('#container');
  errorInfo = document.querySelector('div#errorinfo');

  requestPosts.open('GET', 'https://jsonplaceholder.typicode.com/posts');
  requestPosts.addEventListener('load', postsLoadHandler);
  requestPosts.send();
}

document.addEventListener('DOMContentLoaded', contentHandler);

// post
// {
//     "userId": 1,
//     "id": 1,
//     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//   }

// users
// {
//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//       "street": "Kulas Light",
//       "suite": "Apt. 556",
//       "city": "Gwenborough",
//       "zipcode": "92998-3874",
//       "geo": {
//         "lat": "-37.3159",
//         "lng": "81.1496"
//       }
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": "hildegard.org",
//     "company": {
//       "name": "Romaguera-Crona",
//       "catchPhrase": "Multi-layered client-server neural-net",
//       "bs": "harness real-time e-markets"
//     }
//   },

// comments
// {
//     "postId": 1,
//     "id": 1,
//     "name": "id labore ex et quam laborum",
//     "email": "Eliseo@gardner.biz",
//     "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
//   }
