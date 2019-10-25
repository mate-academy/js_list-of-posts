'use strict';

function loadPost() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
  xhr.send();
  xhr.onload = function() {
    const posts = JSON.parse(xhr.responseText);
    posts.forEach((post)=> {
      const article = container.appendChild(document.createElement('article'));
      const h2 = article.appendChild(document.createElement('h2'));
      const postBody = article.appendChild(document.createElement('div'));
      const comments = article.appendChild(document.createElement('section'));
      h2.innerHTML = post.title;
      postBody.innerHTML = post.body;
      article.classList.add(`autor${post.userId}`);
      comments.classList.add(`post${post.id}`);
    })
  }

}

function loadAutors() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
  xhr.send();
  xhr.onload = function() {
    const autors = JSON.parse(xhr.responseText);
    autors.forEach((autor)=> {
      const idAutor = document.querySelectorAll(`.autor${autor.id}`);
      idAutor.forEach((post) => {
        const h4 = post.insertBefore(document.createElement('h4'), post.firstChild);
        h4.innerHTML = autor.name;
      }
      );
    })
  }
}

function loadComments() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/comments', true);
  xhr.send();
  xhr.onload = function() {
    const comments = JSON.parse(xhr.responseText);
    comments.forEach( (comment)=> {
    const postId = document.querySelector(`.post${comment.postId}`);
    const dl = postId.appendChild(document.createElement('dl'));
    const dt = dl.appendChild(document.createElement('dt'));
    dt.innerHTML = comment.name;
    const dd = dl.appendChild(document.createElement('dd'));
    dd.innerHTML = comment.body;
    })
  }
}

loadPost();
loadAutors();
loadComments();