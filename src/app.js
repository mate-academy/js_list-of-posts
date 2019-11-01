const fetchData = async function (url) {
  const response = await fetch(url);

  return await response.json();
};


const buildPostsList = async () => {
  Promise.all([fetchData('https://jsonplaceholder.typicode.com/posts'),
    fetchData('https://jsonplaceholder.typicode.com/users'),
    fetchData('https://jsonplaceholder.typicode.com/comments')])
      .then(result => {
      const [posts, users, comments] = result;
      const listContainer = document.getElementById('posts');

      posts.forEach((post) => {
        const line = document.createElement('li');
        const postTitle = document.createElement('p');
        const postBody = document.createElement('p');
        const postAuthor = document.createElement('p');
        const postAuthorRow = users.find(user => user.id === post.userId);
        const postCommentsRows = comments.filter(comment => comment.postId === post.id);
        const postComments = document.createElement('ul');

        postTitle.className = 'post-title';
        postBody.className  = 'post-body';
        postAuthor.className  = 'post-author';

        listContainer.append(line);
        line.append(postTitle);
        postTitle.append(post.title);
        line.append(postBody);
        postBody.append(post.body);
        line.append(postAuthor);
        postAuthor.append(`Author: ${postAuthorRow.name}`);
        line.append(postComments);

        postCommentsRows.forEach((comment) => {
          const postCommentsLine =  document.createElement('li');
          const commentTitle = document.createElement('p');
          const commentBody = document.createElement('p');
          const commentAuthor = document.createElement('p');

          commentTitle.className = 'comment-title';
          commentBody.className  = 'comment-body';
          commentAuthor.className  = 'comment-author';

          postComments.append(postCommentsLine);
          postCommentsLine.append(commentTitle);
          commentTitle.append(comment.name);
          postCommentsLine.append(commentBody);
          commentBody.append(comment.body);

          postCommentsLine.append(commentAuthor);
          commentAuthor.append(`Author: ${comment.email}`)
        })
      })
      });
};


window.onload = buildPostsList;
