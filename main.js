const body = document.querySelector('body');
const ul = document.createElement('ul');
ul.classList.add('list');
urlPosts = `https://jsonplaceholder.typicode.com/posts`;
urlUsers = `https://jsonplaceholder.typicode.com/users`;
urlComments = `https://jsonplaceholder.typicode.com/comments`;

const getDataByUrl = async function(url) {
  return fetch(url)
    .then(responce => responce.json());
}

const getData = async function() {
  return await Promise.all([getDataByUrl(urlPosts), getDataByUrl(urlUsers), getDataByUrl(urlComments)]);
}

const render = async function() {
  const [posts, users, comments] = await getData();
  const postList = new Map();
  const userList = new Map();
  const commentList = new Map();
  for (let user of users) {
    userList.set(user.id, user.name);
  }
  for (let comment of comments) {
    const postId = comment.postId;
    const commentToPost = {
      id: comment.id,
      author: comment.name,
      text: comment.body
    }
    
    const commentsToPost = commentList.get(postId) || [];
    commentsToPost.push(commentToPost);
    commentList.set(postId, commentsToPost);
  }

  for (let post of posts) {
    const postObj = {};
    postObj.title = post.title;
    postObj.text = post.body;
    postObj.author = userList.get(post.userId);
    postObj.comments = commentList.get(post.id);
    postList.set(post.id, postObj)
  }

  postList.forEach((post, id) =>{
    const postBody = document.createElement('li');
    postBody.classList.add('post');

    const postTitle = document.createElement('h1');
    postTitle.classList.add('post__heading', 'heading');
    postTitle.textContent = post.title;

    const postText = document.createElement('p');
    postText.classList.add('post__text', 'text');
    postText.textContent = post.text;

    const postAuthor = document.createElement('span');
    postAuthor.classList.add('post__author', 'author');
    postAuthor.textContent = post.author;

    const postComments = document.createElement('div');
    postComments.classList.add('post__comments', 'comments');

    const comments = commentList.get(id) ? commentList.get(id) : [];
    for (comment of comments) {
      const postComment = document.createElement('div');
      postComment.classList.add('comments__comment', 'comment');

      const commentAuthor = document.createElement('span');
      commentAuthor.classList.add('comment__author', 'author');
      commentAuthor.textContent = comment.author;

      const commentText = document.createElement('p');
      commentText.classList.add('comment__text', 'text');
      commentText.textContent = comment.text;

      postComment.append(commentAuthor, commentText);
      postComments.append(postComment);
    }

    postBody.append(postTitle, postText, postAuthor, postComments);
    ul.append(postBody);
  })
}

render();
body.append(ul);