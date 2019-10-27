'use script';

const getData = function(url) {
  return fetch(url).then(response => response.json());
}

const renderList = async function () {
  const userList = await getData('https://jsonplaceholder.typicode.com/users');
  const postList = await getData('https://jsonplaceholder.typicode.com/posts');
  const commentList = await getData('https://jsonplaceholder.typicode.com/comments');


  const itemsContainer = document.querySelector('#itemsContainer');

  for(let post of postList) {    
    const relatedUser = userList.find(user => user.id === post.userId);
    const relatedComments = commentList.filter(comment => comment.postId === post.id);

    const item = document.createElement('div');
    item.classList.add('item');

    const content = document.createElement('div');
    content.classList.add('content');
    item.append(content);
    
    const title = document.createElement('div');
    title.classList.add('header');
    title.innerHTML = post.title;
    content.append(title);

    const meta = document.createElement('div');
    meta.classList.add('meta');
    meta.innerHTML = `<i class="user circle outline icon"></i><span>${relatedUser.name}</span>`
    content.append(meta);

    const postText = document.createElement('div');
    postText.classList.add('description');
    postText.innerHTML = post.body;
    content.append(postText);

    const comments = document.createElement('div');
    comments.classList.add('ui', 'comments');
    comments.innerHTML = `<h4 class="ui dividing header">Comments</h4>`;
    content.append(comments);

    for(let exactComment of relatedComments) {
      const comment = document.createElement('div');
      comment.classList.add('comment');

      const commentBody = document.createElement('div');
      commentBody.classList.add('content');
      commentBody.innerHTML = `<div class="author">${exactComment.name}</div>
      <p class="text">${exactComment.name}</p>`
      comment.append(commentBody);

      comments.append(comment);
    }
    
    itemsContainer.append(item);
    // console.log(relatedComents)
  }
  
}; renderList();

