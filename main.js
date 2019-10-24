// 'use strict'; 

let postsEnvironment = document.querySelector('.postsEnvironment'); 

async function getDate(url) {
  const response = await fetch(url); 
  return await response.json(); 
}

Promise.all([getDate('https://jsonplaceholder.typicode.com/posts'), 
getDate('https://jsonplaceholder.typicode.com/users'), 
getDate('https://jsonplaceholder.typicode.com/comments')])
.then(rezult => {
  for (let i = 0; i < rezult[0].length; i++) {
    let post = rezult[0][i]; 
    let userObj = rezult[1].find((user) => user.id === post.userId); 
    post.user = userObj; 
    post.comments = []; 
    let currentComments = rezult[2].filter((id) => id.postId === post.userId);
    for (let j = 0; j < currentComments.length; j++) {
      post.comments.push({}); 
      post.comments[j].name = currentComments[j].name; 
      post.comments[j].body = currentComments[j].body; 
    }
    let postStr = `
      <div class="authorName"><strong>${post.user.name}</strong></div>
      <div class="photo"></div>
      <div class="title"><strong>${post.title}</strong></div>
      <div class="bodyText">${post.body}</div>
      <div class="commentsVisible"><strong>Watch comments 
      (${post.comments.length})</strong></div>
    `; 
    let allComments = ''; 
    for (let k = 0; k < post.comments.length; k++) {
      if (k === post.comments.length - 1) {
        allComments += `<p><strong>${post.comments[k].name}</strong>: 
          ${post.comments[k].body}</p>`;
      } else {allComments += `<p><strong>${post.comments[k].name}</strong>: 
        ${post.comments[k].body}</p><hr>`;}
       
    }
    let mainCommentsDiv = `<div class="comments-main-div" hidden>${allComments}</div>`; 
    postStr += mainCommentsDiv; 
    let mainPostDiv = document.createElement('div'); 
    mainPostDiv.classList.add('post'); 
    mainPostDiv.innerHTML = postStr; 
    postsEnvironment.append(mainPostDiv);
  }

  //--------------------COMENTS SHOW---------------------------------
  const commentsVisible = document.querySelectorAll('.commentsVisible'); 
  const commentsMainDiv = document.querySelectorAll('.comments-main-div'); 

  for (let i = 0; i < commentsVisible.length; i++) { 
    commentsVisible[i].addEventListener('click', (e) => {
      if (!e.target.parentNode.classList.contains('commentsVisible')) {
        return
      }
      
      commentsMainDiv[i].hidden = !commentsMainDiv[i].hidden;
    })
  }  
}); 
