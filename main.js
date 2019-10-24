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
  const [postsList, usersList, commentsList] = rezult; 

  for (let i = 0; i < postsList.length; i++) {
    let currentPost = postsList[i]; 
    let currentUser = usersList.find(user => user.id === currentPost.userId); 
    let currentComments = commentsList.filter(comment => 
      comment.postId === currentPost.id);
    createPost(currentUser.name, currentPost.title, currentPost.body, currentComments); 
  }
//--------------------COMENTS SHOW-----------------------------------------
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

function createPost(name, title, body, comments = []) {
  let postStr = `
    <div class="authorName"><strong>${name}</strong></div>
    <div class="photo"><img src="https://source.unsplash.com/collection/190727/
      ${Math.round(Math.random() * (450 - 400) + 400)}x
      ${Math.round(Math.random() * (350 - 300) + 300)}
      /?food,game,car,nature,animal" class="main-image"></div>
    <div class="title"><strong>${title}</strong></div>
    <div class="bodyText">${body}</div>
    <div class="commentsVisible"><strong>Watch comments 
    (${comments.length})</strong></div>
  `; 
  let allComments = ''; 
  for (let k = 0; k < comments.length; k++) {
    if (k === comments.length - 1) {
      allComments += `<p><strong>${comments[k].name}</strong>: 
        ${comments[k].body}</p>`;
    } else {
      allComments += `<p><strong>${comments[k].name}</strong>: 
      ${comments[k].body}</p><hr>`;}
  }
  let mainCommentsDiv = `<div class="comments-main-div" hidden>${allComments}</div>`; 
  postStr += mainCommentsDiv;

  let mainPostDiv = document.createElement('div'); 
  mainPostDiv.classList.add('post'); 
  mainPostDiv.innerHTML = postStr; 
  postsEnvironment.append(mainPostDiv);
}
