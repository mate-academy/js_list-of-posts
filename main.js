'use strict';

const container = document.getElementById('container');

function getInfo(URL) {
  return fetch(URL).then(incomeValue => incomeValue.json())
                   .catch(error => (error.name = 'OOOOOPS SOMETHING WRONG'));
}



async function getCards() {

  const url = 'https://jsonplaceholder.typicode.com/';

  const [posts, users, comments] = await Promise.all([
    getInfo(`${url}posts`),
    getInfo(`${url}users`),
    getInfo(`${url}comments`)
  ]);

   let counter = 0;
  for (let post of posts) {
    counter++;
    const pattern = document.createElement("div");
    pattern.className = 'box';
    const postTitle = post.title;
    const postBody = post.body;
    const userName = users.find(user => user.id === post.userId).name;
    const postComments = comments.filter(comment => comment.postId === post.id);

    let dropDownContent = ``;


    for (let i = 0; i < postComments.length; i++) {
      dropDownContent += `<h4 id="commentHead">${postComments[i].name}</h4>
                           <p id="commentText">${postComments[i].body}</p>`;
    }

      pattern.innerHTML = `
        <div class="ui card">
          <div class="content">
            <div class="right floated meta">${counter}h ago</div>
            <img class="ui avatar image" src="https://source.unsplash.com/random"> ${userName}
          </div>
          <div class="image">
            <img class = "big_image" src="https://source.unsplash.com/random/">
          </div>
          <div class="content">
            <h3>${postTitle}</h3>
            <p>${postBody}</p>
            <span class="right floated">
              <i class="heart outline like icon"></i>
              ${postComments.length} likes
            </span>
            <div class="click">
              <i class="comment icon"></i>
              ${postComments.length} comments
            </div>
          </div>
          <div class = "dropDown">
            ${dropDownContent}
          </div>
          <div class = "extra content">
            <div class="ui large transparent left icon input">
              <input type="text" placeholder="Add Comment...">
            </div>
          </div>
        </div>
            `;

    container.append(pattern);
  }

  let dropDown = document.querySelectorAll('.dropDown');
  for (let item of dropDown) {
    item.hidden = true;
  }

  container.addEventListener('click' , (action) => {
    if (action.target.className !== 'click') {
      return;
    }

    const dropDownTarget = action.target.parentNode.nextElementSibling;
    dropDownTarget.hidden = !dropDownTarget.hidden;
  });

}

getCards();
