'use strict'

const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
// const urlUsers = 'https://jsonplaceholder.typicode.com/users';
// const urlComments = 'https://jsonplaceholder.typicode.com/comments';

const requestPosts = new XMLHttpRequest();
// const requestUsers = new XMLHttpRequest();
// const requestComments = new XMLHttpRequest();

const container = document.querySelector('.container');

requestPosts.open('GET', urlPosts, false);
// requestUsers.open('GET', urlUsers, false);
// requestComments.open('GET', urlComments, false);

requestPosts.send();
// requestUsers.send();
// requestComments.send();

console.log(JSON.parse(requestPosts.responseText));
// console.log(JSON.parse(requestUsers.responseText));
// console.log(JSON.parse(requestComments.responseText));

const arrayPosts = JSON.parse(requestPosts.responseText)
// const arrayBodies = JSON.parse(requestUsers.responseText)
// const arrayPhones = JSON.parse(requestComments.responseText)

console.log('load')
for (let i = 0; i < arrayPosts.length; i++) {
  const post = document.createElement('div');

  post.innerHTML = `
  <h2>${arrayPosts[i]['title']}</h2>
  <div>${arrayPosts[i]['body']}</div>
  `;
  // <h4>${arrayPosts[i]['userId']}</h4>
  
  container.append(post);
}
