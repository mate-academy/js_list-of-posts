function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();

  return JSON.parse(xhr.responseText);
};

let posts = getJSON('https://jsonplaceholder.typicode.com/posts');
let authors = getJSON('https://jsonplaceholder.typicode.com/users');
let comments = getJSON('https://jsonplaceholder.typicode.com/comments');
let containerEl = document.getElementById('posts');

posts.forEach(post => {
  let postAuthor = authors.find(author => author.id === post.userId);
  let postComments = comments.filter(comment => comment.postId === post.id);

  let postEl = document.createElement('div');
  postEl.classList.add('post');

  let titleEl = document.createElement('div');
  titleEl.classList.add('title');
  titleEl.innerHTML = post.title;
  postEl.appendChild(titleEl);

  let authorEl = document.createElement('div');
  authorEl.classList.add('author');
  authorEl.innerHTML = postAuthor.name;
  postEl.appendChild(authorEl);

  let contentEl = document.createElement('div');
  contentEl.classList.add('content');
  contentEl.innerHTML = post.body;
  postEl.appendChild(contentEl);

  let commentsEl = document.createElement('div');
  commentsEl.classList.add('comments');
  
postComments.forEach(comment => {
  let commentEl = document.createElement('div');
  commentEl.classList.add('comment');
  commentEl.innerHTML = `
    <div class="comment__title">${comment.name}</div>
    <div class="comment__content">${comment.body}</div>
  `;
  commentsEl.appendChild(commentEl);
});
  postEl.appendChild(commentsEl);
  
  containerEl.appendChild(postEl);
});

