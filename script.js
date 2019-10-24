function table() {
  const table = document.querySelector('.table');
  table.innerHTML = `
  <table class="ui red table">
    <thead>
      <th>Title</th>
      <th>The text of the post</th>
      <th>Authors name</th>
      <th>post comments</th>
    </thead>
    <tbody id='tableBody'></tbody>
  </table>
  `;

  const creator = async function(url) {
    const response = await fetch(url);
    return response.json();
  }

  const list = async function () {

    const posts = await creator(`https://jsonplaceholder.typicode.com/posts`);
    const usersList = await creator(`https://jsonplaceholder.typicode.com/users`);
    const comments = await creator(`https://jsonplaceholder.typicode.com/comments`);

    const tbody = document.getElementById('tableBody');

    for (let post of posts) {

      const postsCell = document.createElement('td');
      const postText = document.createElement('td');
      const commentsCell = document.createElement('table');
      const rows = document.createElement('tr');
      const miniRows = document.createElement('tr');

      postsCell.textContent = post.title;
      postText.textContent = post.body;

      for (let user of usersList) {
        if (user.id === post.userId) {

          const authorsCell = document.createElement('td');

          post.userId = user;
          authorsCell.textContent = post.userId.name;

          for (let comment of comments) {
            if (comment.postId === post.id) {
              comment.postId = post;

              const commentAuthor = document.createElement('td');
              const commentText = document.createElement('td');

              commentAuthor.textContent = comment.name;
              commentText.textContent = comment.body;
              commentText.className = 'commentText';
              commentAuthor.className = 'commentAuthor';
              miniRows.append(commentAuthor, commentText);
            }

          }
          commentsCell.appendChild(miniRows)
          rows.append(postsCell, postText, authorsCell, commentsCell);
          tbody.appendChild(rows);
        }
      }
    }
  }
  list()
}
table();
