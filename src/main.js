'use strict'

const getData = (url) => {
  return fetch(url)
    .then(response => response.json());
};

const posts = async () => {
  const [posts, users, comments] = await
    Promise.all(
    [getData(`https://jsonplaceholder.typicode.com/posts`),
      getData(`https://jsonplaceholder.typicode.com/users`),
      getData(`https://jsonplaceholder.typicode.com/comments`)
    ]);

  const wrapper = document.querySelector('#wrapper');
  const keys = Object.keys(posts);

  keys.map(item => {

    const post = document.createElement('div');
    post.className = 'ui card';

    const postsValue = posts[item];
    const findPost = posts.find(item => item.id === postsValue.id);
    const title = findPost.title;
    const body = findPost.body;
    const userName = users.find(user => user.id === postsValue.userId).username;

    post.innerHTML = `
      <div class="content">
        <div class="header">${title}</div>
      </div>
      
      <div class="content">
        <div class="ui small feed">${body}</div>
      </div>

      <div class="content">
        <div class="ui small feed author">
          <img class="ui avatar image" src="src/img/${postsValue.userId}.jpg">${userName}
        </div>
      </div>
    `;
    wrapper.append(post);

    const extraContent = document.createElement('div');
    extraContent.className = 'extra content';

    extraContent.innerHTML = `
      <div class="content">
        <div class="ui comments">
          <h3 class="ui dividing header">Comments</h3>
        </div>
      </div>
    `;
    post.append(extraContent);

    let inner = '';
    const pickedCom = comments.reduce((res, comment) => {
      if (comment.postId === postsValue.id) {
        inner += `
        <div class="content">
          <div class="ui small feed author">${comment.name}</div>                        
          <div class="text">${comment.body}</div>
        </div>
      `;
        return res += inner;
      }
      return res;
    }, '');

      const singleComment = document.createElement('div');
      singleComment.className = 'comments';

      singleComment.innerHTML = inner;
      extraContent.append(singleComment);
  });
};

posts();



