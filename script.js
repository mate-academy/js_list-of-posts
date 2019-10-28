'use strict';

const postUrl = 'https://jsonplaceholder.typicode.com/posts';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
const container = document.getElementById('list');

function fetchData(url) {
  return fetch(url)
    .then(response => response.json());
}

async function getData() {
  const [posts, users, comments] = await Promise.all([
    fetchData(postUrl),
    fetchData(usersUrl),
    fetchData(commentsUrl)
  ]);

  for (let post of posts) {
    const user = users.find(user => user.id === post.userId);
    const listBlock = document.createElement('div');
    let commentsBlock = ``;
    
    for (let comment of comments) {
      if (comment.postId === post.id) {
        commentsBlock += `
          <h4>${comment.name}</h4>
          <p>${comment.body}</p>
        `
      }
    }

    listBlock.className = 'listBlock';

    listBlock.innerHTML = `
      <h2 class="title">${post.title}</h3>
      <p class="text">${post.body}</p>
      <h4 class="userName">${user.name}</h4>
      <h2 class="heading">Comments</h2>
      <div class="comments">${commentsBlock}</div>
      `;

    container.append(listBlock);
  }

  // function getComments(items) {
  //   let commentsBlock = ``;

  //   for (let i = 0; i < items.length; i++) {
  //     commentsBlock += `
  //       <h4>${items[i].name}</h4>
  //       <p>${items[i].body}</p>
  //       `
  //   }

  //   return commentsBlock;
  // }
}

getData();
