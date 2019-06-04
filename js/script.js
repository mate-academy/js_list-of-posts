const table = document.querySelector('#table');
const posts = createTodoSList('https://jsonplaceholder.typicode.com/posts');
const users = createTodoSList('https://jsonplaceholder.typicode.com/users');
const comments = createTodoSList('https://jsonplaceholder.typicode.com/comments');

function createTodoSList(url) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();

  const parseData = JSON.parse(xhr.responseText);

  return parseData;
}

function createTemplate(posts, user) {
  return `
      <h2><span>Posts</span> - ${posts.title}</h2>
      <p><span>User</span> - ${posts.body}<p/>
      <p class="user"><span>UserName</span> - ${user[0].name}<p/>
      <div id="${posts.id}"></div>
  `
}

function createComments(comment) {
  return `
    <div class="comments">
      <h3>${comment.name}</h3>
      <p>${comment.name}</p>
    </div>
  `
}

posts.forEach(post => {
  const div = document.createElement('div');
  const userAuthor = users.filter((i) => post.userId === i.id);
  const comment = comments.filter((i) => i.postId === post.id);
  div.innerHTML = createTemplate(post, userAuthor);
  table.append(div);
  const commentsBlock = document.getElementById(`${post.id}`);
  comment.forEach((com) => {
    commentsBlock.insertAdjacentHTML('beforeend', createComments(com));
  });
});