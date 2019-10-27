'use strict';

const container = document.querySelector('.container');

function loadApi(url) {
  return fetch(url)
    .then(responce => responce.json())
    .then(data => data)
}

function loadItems() {
  Promise.all([
    loadApi('https://jsonplaceholder.typicode.com/posts'),
    loadApi('https://jsonplaceholder.typicode.com/users'),
    loadApi('https://jsonplaceholder.typicode.com/comments'),
  ])
  .then(([posts, users, comments]) => {
    return render(posts, users, comments);
  })
}

loadItems();

function createTemplate(post, user) {
  return `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <i>${user.name}</i>
    <section id="${post.id}" class="comments"></section>
  `;
}

function createComment(comment) {
  return `
    <div class="comment">
      <h4>${comment.name}</h4>
      <p>${comment.name}</p>
    </div>
  `;
}

function render(posts, users, comments) {
  posts.forEach(post => {
    const postWrapper = document.createElement('article');
    const postsAuthor = users.find(author => post.userId === author.id);
    const postsComments = comments.filter(comment => comment.postId === post.id);
    
    postWrapper.innerHTML = createTemplate(post, postsAuthor);

    container.append(postWrapper);

    const commentsSection = document.getElementById(`${post.id}`);

    postsComments.forEach((comment) => {
        commentsSection.insertAdjacentHTML('beforeend', createComment(comment));
    });
  });
}
