'use strict'

const connection = (url) => {
  return fetch(url)
    .then(response => response.json());
};

const posts = async () => {
  const [posts, users, comment] = await Promise.all(
    [connection(`https://jsonplaceholder.typicode.com/posts`),
            connection(`https://jsonplaceholder.typicode.com/users`),
            connection(`https://jsonplaceholder.typicode.com/comments`)]);

  const wrapper = document.querySelector('#wrapper');
  const keys = Object.keys(posts);

  keys.map(item => {

    const post = document.createElement('div');
    post.className = 'ui card';

    const postsValue = posts[item];
    const title = posts.find(item => item.id === postsValue.id).title;
    const body = posts.find(item => item.id === postsValue.id).body;
    const userName = users.find(user => user.id === postsValue.userId).username;

    post.innerHTML = `<div class="content">
                        <div class="header">${title}</div>
                        </div>
                        <div class="content">
                          <div class="ui small feed">${body}</div>
                        </div>
                  
                        <div class="content">
                          <div class="ui small feed author">
                            <img class="ui avatar image" src="src/img/${postsValue.userId}.jpg">${userName}
                          </div>
                        </div>`;
    wrapper.append(post);

    const comments = document.createElement('div');
    comments.className = 'extra content';

    comments.innerHTML = `<div class="content">
                            <div class="ui comments">
                              <h3 class="ui dividing header">Comments</h3>
                            </div>
                          </div>`;
    post.append(comments);

    const pickedCom = comment.filter(item => item.postId === postsValue.id);

    for (let i = 0; i < pickedCom.length; i++) {
      const userCom = pickedCom[i].body;
      const titleCom = pickedCom[i].name;

      const singleComment = document.createElement('div');
      singleComment.className = 'comment';

      singleComment.innerHTML = `<div class="content">
                                   <div class="ui small feed author">${titleCom}</div>                        
                                  <div class="text">${userCom}</div>
                                 </div>`;
      comments.append(singleComment);
    }
  });
};

posts();
