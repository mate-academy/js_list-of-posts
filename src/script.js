'use strict';

const container = document.querySelector('.container');

async function loadInfo(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
};

async function formPostsList() {
  const [posts, users, comments] = await Promise.all([
    loadInfo('https://jsonplaceholder.typicode.com/posts'),
    loadInfo('https://jsonplaceholder.typicode.com/users'),
    loadInfo('https://jsonplaceholder.typicode.com/comments')
  ]);

  for (let post of posts){
    const postBlock = document.createElement('div');
    const postComments = comments.filter(comment => comment.postId === post.id);
    postBlock.innerHTML =`
      <h2 class="title">${post.title}</h2>
      <h3 class="name">${users.find(user => user.id === post.userId).name}</h3>
      <h3 class="text">${post.body}</h3>
      <h3>Comments</h3>
      <div>${formComments(postComments)}</div>
      <hr>
      `;
    container.append(postBlock);
  }

  function formComments(items) {
    let commentsBlock = ``;
    for (let i = 0; i < items.length; i++) {
      commentsBlock += `
        <h4>${items[i].name}</h4>
        <p>${items[i].body}</p>
        `
    }
    return commentsBlock;
  }
};

formPostsList();
