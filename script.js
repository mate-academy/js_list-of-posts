'use strict';

function getUrl(url){
  return fetch(url)
      .then(data => data.json())
}

Promise.all([
      getUrl(' https://jsonplaceholder.typicode.com/posts'),
      getUrl('https://jsonplaceholder.typicode.com/users'),
      getUrl('https://jsonplaceholder.typicode.com/comments')
  ]).then(data => {
      createList(data[0], data[1], data[2]);
    });

function createList(posts,users,comments) {
  const container = document.querySelector('#container');

  users.map((item) => {
    const user = document.createElement('div');
    const subList = document.createElement('div');
    const userName = document.createElement('h2');

    userName.className = 'ui header';
    container.append(user);
    userName.innerHTML = item.name;
    user.append(userName);
    user.append(subList);

    posts.map(post => {
      const commentsList = document.createElement('ul');

      if(post.userId === item.id) {
        const postList = document.createElement('div');
        const postBody = document.createElement('p');
        const postTitle = document.createElement('h3');
        const postDiv = document.createElement('div');

        postList.className = 'ui message';
        commentsList.className = 'ui list';
        postTitle.className = 'ui content large header';
        postBody.className = 'ui big';
        postDiv.className = 'ui big message';
        postTitle.innerHTML = post.title;
        postBody.innerHTML = post.body;
        subList.append(postList);
        postDiv.append(postTitle);
        postDiv.append(postBody);
        postList.append(commentsList);
        postList.prepend(postDiv);
      }

      comments.map((comment) => {
        if(comment.postId === post.id) {
          const commentList = document.createElement('div');
          const commentName = document.createElement('h3');
          const commentBody = document.createElement('div');

          commentList.className = 'ui message';

          commentName.innerHTML = comment.name;
          commentBody.innerHTML = comment.body;
          commentList.prepend(commentName);
          commentList.append(commentBody);
          commentsList.append(commentList);
        }
      });
    });
  });
}
