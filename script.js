let url = `https://jsonplaceholder.typicode.com`;

let posts = fetch(`${url}/posts`)
  .then(response => response.json());

let users = fetch(`${url}/users`)
  .then(response => response.json());

let comments = fetch(`${url}/comments`)
  .then(response => response.json());


Promise.all([posts, users, comments])
  .then(([posts, users, comments]) => {

let block = document.querySelector('.block');
posts.forEach(post => {
  let section = document.createElement('section');
  section.className = 'ui card';
  section.style.padding = '2%';
  let title = document.createElement('h1');
  title.innerText = post.title;
  let comment = document.createElement('p');
  comment.innerText = post.body;
  let author = document.createElement('i');
  author.innerText = users[post.userId].name;

let commentsBlock = document.createElement('div')
comments.forEach(comment => {
  if(comment.postId === post.id) {
    const commentHtml = document.createElement('div');
    const commentName = document.createElement('h5');
    const commentText = document.createElement('p');
    commentName.innerText = comment.name;
    commentText.innerText = comment.body;
    commentHtml.append(commentName, commentText);
    commentsBlock.append(commentHtml);
  }
});

section.append(title);
section.append(comment);
section.append(author);
section.append(commentsBlock);
block.append(section);
});
});

