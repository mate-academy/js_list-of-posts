'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const xhrPosts = new XMLHttpRequest();
  xhrPosts.open('GET',  'https://jsonplaceholder.typicode.com/posts');
  xhrPosts.send();


  xhrPosts.onload = function () {
    const xhrAuthors = new XMLHttpRequest();
    xhrAuthors.open('GET',  'https://jsonplaceholder.typicode.com/users');
    xhrAuthors.send();

    xhrAuthors.onload = function () {
      const xhrComments = new XMLHttpRequest();
      xhrComments.open('GET',  'https://jsonplaceholder.typicode.com/comments');
      xhrComments.send();
      xhrComments.onload = function() {
        const posts = JSON.parse(xhrPosts.response);
        const authors = JSON.parse(xhrAuthors.response);
        const comments = JSON.parse(xhrComments.response);

        const completePosts = posts.forEach((post) => {
          post.author = authors.find(author => author.id === post.userId);
          post.comment = comments.filter(comment => comment.postId === post.id);
          createPost(post.title, post.body, post.author.name, post.author.email, post.comment)
        })
      }
    }
  };
});

const body = document.querySelector('body');

function createPost(title, text, name, email, commentList){
  const section = document.createElement('section');
  const ul = document.createElement('ul');

  section.insertAdjacentHTML('beforeend',
    `<h3>${title}</h3>
    <p>${text}</p>
    <address><a href="mailto:${email}">${name}</a></address>`);

  commentList.forEach((com) => {
      const li = document.createElement('li');
      ul.insertAdjacentHTML('beforeend',
        `<li><address>${com.name}</address><br>${com.body}</li>`)
    }
  );
  section.append(ul);
  body.append(section);
}
