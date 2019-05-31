const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json());

const usersResponse = fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json());

const commentsResponse = fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json());

Promise.all([postsResponse, usersResponse, commentsResponse])
  .then(([posts, users, comments]) => {
    const container = document.querySelector('#container');
    posts.forEach(post => {
      const section = document.createElement('section');

      const title = document.createElement('h2');
      title.innerText = post.title;

      const body = document.createElement('p');
      body.innerText = post.body;

      const userName = document.createElement('i');
      userName.innerText = users.find(user => user.id === post.userId).name;

      const commentsBlock = document.createElement('div')
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
      section.append(body);
      section.append(userName);
      section.append(commentsBlock);

      container.append(section);
    });
  })
