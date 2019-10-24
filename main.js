// 'use strict'; 

let postsEnvironment = document.querySelector('.postsEnvironment'); 

async function getDate(url) {
  const response = await fetch(url); 
  return await response.json(); 
}

async function listOfPosts() {
  const posts = await getDate('https://jsonplaceholder.typicode.com/posts'); 
  const users = await getDate('https://jsonplaceholder.typicode.com/users'); 
  const comments = await getDate('https://jsonplaceholder.typicode.com/comments');

  // console.log(posts); 
  // console.log(users); 
  // console.log(comments); 
  let postString, author, test, usersComments;
  let currentComments; 
  

  for (let i = 0, j = 1; i < posts.length; i++, j++) {
    postString = ''; 
    author = users.find((data) => data.id === posts[i].userId).name; 
    postString += `<div class="authorName"><strong>${author}</strong></div>`; 
    postString += `<div class="photo"></div>`; 
    postString += `<div class="title"><strong>${posts[i].title}</strong></div>`;
    postString += `<div class="bodyText">${posts[i].body}</div>`;  
    currentComments = comments.filter((id) => id.postId === j); 
    postString += `<div class="commetsOn"><strong>Watch comments (${currentComments.length})</strong></div>`; 
    usersComments = '';
    for (let k = 0; k < currentComments.length; k++) {
      if (k === currentComments.length - 1) {
        usersComments += `<p><strong>${currentComments[k].name}</strong>: ${currentComments[k].body}</p>`;
      } else {
        usersComments += `<p><strong>${currentComments[k].name}</strong>: ${currentComments[k].body}<hr></p>`;
      }
    }
    postString += `<div class="comments">${usersComments}</div>`; 
    test = document.createElement('div'); 
    test.classList.add('post'); 
    test.innerHTML = postString; 
    postsEnvironment.append(test);
  }

  const commentsOn = document.querySelectorAll('.commetsOn'); 
  const commentsDiv = document.querySelectorAll('.comments'); 

  for (let i = 0; i < commentsOn.length; i++) { 
    commentsOn[i].addEventListener('click', (e) => {
      if (!e.target.parentNode.classList.contains('commetsOn')) {
        return
      }
      
      if (getComputedStyle(commentsDiv[i]).display === 'none') {
        commentsDiv[i].style.display = 'block';
      } else {
        commentsDiv[i].style.display = 'none';
      }
    })
  }
};  

listOfPosts(); 

//--------------------------------------------------------------------------------------------------------------------------------------------




