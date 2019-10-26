const container = document.querySelector('#root');
const data = [
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/comments'    
];

function createPromise(url) {
  return fetch(url).then(resp => resp.json());
}

function getAllData(urls) {
  return Promise.all(urls.map(url => createPromise(url)));
}

function init() {
  getAllData(data).then((responses) => parseData(responses));
}

function parseData(dataArrs) {
  const [posts, users, comments] = dataArrs;
  createPodos(posts, users, comments);
}

document.addEventListener('DOMContentLoaded', init)

function getUserName(users, id) {
  return findedObj = users.find(obj => obj.id === id);
}

function getComment(comments, id) {
  const sortedComments = comments.filter(obj => obj.postId === id);
  console.log(sortedComments);
  return createComments(sortedComments);
}

function createComments(comments) {
  const div = document.createElement('div');
  for (const comment of comments) {
    div.insertAdjacentHTML('afterbegin', `
    <div class="comment">
      <h5>${comment.name}</h5>
      <p>${comment.body}</p>
    </div>
    `)
  }
  return div;
}

function createPodos(posts, users, comments) {
  for (let i = 0; i < posts.length; i++) {
    const user = getUserName(users, posts[i].userId);
    const comment = getComment(comments, posts[i].id);
    const article = document.createElement('article');
    
    article.classList.add('wrap');
    article.insertAdjacentHTML('beforeend', `
      <h1 class="title">${posts[i].title}</h1>
      <p>${posts[i].body}</p>
      <p>${user.name}</p>
    `)
    article.append(comment);
    container.append(article);
  }
}
