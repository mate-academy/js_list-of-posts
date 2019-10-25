'use strict';

const container = document.querySelector('.container');

function gettingInfo(url) {
  return fetch(url).then(response => response.json());
}

async function creatingPostsLists() {
  const basicUrl = 'https://jsonplaceholder.typicode.com/';
  const [postsList, usersList, commentsList] = await Promise.all([
    gettingInfo(`${basicUrl}posts`),
    gettingInfo(`${basicUrl}users`),
    gettingInfo(`${basicUrl}comments`)]);
    
  const basicClassList = ['ui', 'grid', 'centered'];

  
  for (const posts of postsList) {
    const divBox = document.createElement('div');
    divBox.classList.add(...basicClassList);

    const postsTitle = posts.title;
    const postsBody = posts.body;
    const userName = usersList.find(user => user.id === posts.userId).name;

    const postComments = commentsList.filter(comment => comment.postId === posts.id);

    let dropDownContent = ``;

    for (let i = 0; i < postComments.length; i++) {
      dropDownContent += `<h4 id="commentHead">${postComments[i].name}</h4>
                          <p id="commentText">${postComments[i].body}</p>`;
    }
    
    
    divBox.innerHTML = `<div class="ui card five wide column">
                          <div class="image">
                            <img src="https://source.unsplash.com/${Math.round(Math.random() * (410 - 390) + 390)}x${Math.round(Math.random() * (410 - 390) + 390)}/?man,girl,blog,posts,notes,fashion">
                          </div>
                          <div class="content">
                            <div class="header">${postsTitle}</div>
                            <div class="meta">${userName}</div>
                            <div class="description">
                              <p>${postsBody}</p>
                            </div>
                          </div>
                          <div class="extra content ui styled accordion">
                            <div class="title">
                              <i class="dropdown icon"></i>
                              Show comments
                            </div>
                            <div class="content">
                              ${dropDownContent}
                            </div>
                          </div>
                        </div>`;

    container.append(divBox);

    $('.ui.accordion').accordion();
  }
}

creatingPostsLists();
