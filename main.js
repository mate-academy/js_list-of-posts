'use strict';

const container = document.getElementById('container');
const urlUsers = 'https://jsonplaceholder.typicode.com/users';
const urlComents = 'https://jsonplaceholder.typicode.com/comments';
const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
	
let posts = null;
let users = null;
let comments = null;
  	 
  const xhrUsers = new XMLHttpRequest();
  xhrUsers.open('GET', urlUsers, true);
	xhrUsers.responseType = 'json';
	xhrUsers.addEventListener('load', ()=>{
    users = xhrUsers.response.reduce((acc, item) => {
    	acc[item.id] = item;
    	 return acc
    }, {});
           
      if( posts !== null && users !== null && comments !== null) {
        render();
      }
	  });

  xhrUsers.send();

  const xhrPosts = new XMLHttpRequest();
  xhrPosts.open('GET', urlPosts, true);
  xhrPosts.responseType = 'json';
  xhrPosts.addEventListener('load', ()=> {
    posts = xhrPosts.response;
     
      if( posts !== null && users !== null && comments !== null) {
        render();
      }
    });

  xhrPosts.send();

    const xhrComments = new XMLHttpRequest();
  xhrComments.open('GET', urlComents, true);
  xhrComments.responseType = 'json';
  xhrComments.addEventListener('load', ()=> {
    comments = xhrComments.response;
   
      if( posts !== null && users !== null && comments !== null) {
        render();
      }
    });

  xhrComments.send();

  function render() {
    posts.forEach((el) => {
	  const article = document.createElement('article');
	  const user = users[el.userId];
	
	    article.insertAdjacentHTML('beforeend', `
	      <h4>${el.title}</h4>
	      <p>${user.name}</p>
	      <div>${el.body}</div>
 	      <ul class="post_id_${el.id}">
		  <button class="show_comments">Show/hide comments</button>
		  `
		);
	  comments.filter(item =>  item.postId === el.id);
      article.lastElementChild.insertAdjacentHTML('beforeEnd',
        `
          <li hidden='true'><p>Author:${comments[el.id - 1].name}</p>${comments[el.id -1].body}</li>
          <li hidden='true'><p>Author:${comments[el.id].name}</p>${comments[el.id].body}</li>
          <li hidden='true'><p>Author:${comments[el.id + 1].name}</p>${comments[el.id +1].body}</li>
          <li hidden='true'><p>Author:${comments[el.id + 2].name}</p>${comments[el.id +2].body}<</li>
          <li hidden='true'><p>Author:${comments[el.id + 3].name}</p>${comments[el.id +3].body}</li>
        `);
   	     
  container.append(article);
  });	

  container.onclick = function(event) {
    let target = event.target;
    if( target.className !== 'show_comments') return;
    target.parentNode.querySelectorAll('li').forEach(el => {
    if(!el) return;
    el.hidden = !el.hidden;
    })
  };
};

	

