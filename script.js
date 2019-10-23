'use strict';
const container = document.querySelector('#container');

function loadData(url){
  return fetch(url)
  .then(data => data.json())
};

Promise.all([loadData(' https://jsonplaceholder.typicode.com/posts'), 
loadData('https://jsonplaceholder.typicode.com/users'),
loadData('https://jsonplaceholder.typicode.com/comments')])
.then(data => {
  createList(data[0], data[1], data[2]);
});
function createList(posts,users,comments) {
  const mainList = document.createElement('ol')
  mainList.classList.add('mainList');
  
  users.forEach((item) => {
    const user = document.createElement('li');
    const subList = document.createElement('ul');
    mainList.append(user);
    user.innerHTML = item.name;
    user.append(subList);
    posts.forEach(post => {
      const commentsList = document.createElement('ul');
      if(post.userId === item.id) {
        const postLi = document.createElement('li');
        postLi.innerHTML = post.title;
        postLi.insertAdjacentHTML('beforeend', `<p>${post.body}</p>`)
        subList.append(postLi);
        postLi.append(commentsList);
      }
      comments.forEach((comment) => {
        if(comment.postId === post.id) {
          const commentLi = document.createElement('li');
          commentLi.innerHTML = comment.body;
          commentsList.append(commentLi);
        }
      })
    })
  })
  console.log(document.querySelector('.mainList'))
  container.appendChild(mainList);
}
