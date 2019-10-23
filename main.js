
document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');

  function renderPostsData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.onload = function () {
    const postsData = JSON.parse(xhr.responseText)

      for (let post of postsData){

        const postContainer = document.createElement('div');

        postContainer.classList.add(`autor${post.userId}`)

        const postTitle = document.createElement('h1');
        postTitle.classList.add('title')
        postTitle.innerHTML = post.title;

        const postText = document.createElement('p');
        postText.classList.add('text');
        postText.innerHTML = post.body;

        const comment = document.createElement('div');
        comment.classList.add(`post${post.id}`)

        postContainer.append(postTitle, postText, comment);
        container.append(postContainer);
      }
    }
    xhr.send();
  }

  function renderUsersData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.onload = function () {
      const usersData = JSON.parse(xhr.responseText);

      for (let user of usersData) {
        let posts = document.querySelectorAll(`.autor${user.id}`);

        for (let post of posts) {
          const autor = document.createElement('span');
          autor.innerHTML = user.name;
          post.insertBefore(autor, post.firstChild);
        }
      }
    }
    xhr.send();
  }

  function renderCommentsData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/comments');
    xhr.onload = function () {
      const commentsData = JSON.parse(xhr.responseText);
      for (let comment of commentsData) {

        let posts = document.querySelectorAll(`.post${comment.postId}`)

        for (let post of posts) {
          const commentContainer = document.createElement('div');
          commentContainer.classList.add('comment');
          const commentAutor = document.createElement('h4');
          commentAutor.textContent = `${comment.name} :`;
          const commentText = document.createElement('p');
          commentText.textContent = comment.body;

          commentContainer.append(commentAutor, commentText);
          post.append(commentContainer);
        }
      }
    }
    xhr.send();
  }


  renderPostsData();
  renderUsersData();
  renderCommentsData();

})
