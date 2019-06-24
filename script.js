const requests = ['posts', 'users', 'comments'];
const data = {};

  requests.forEach(function(item){
    const request = new XMLHttpRequest();
    request.open('GET', `https://jsonplaceholder.typicode.com/${item}`);
    request.addEventListener('load', function() {
    data[item] = JSON.parse(this.response);
    if (data.posts && data.users && data.comments) {
      renderPosts(data.posts, data.users, data.comments);
    }
  });
    request.send();
  })

  

 function renderPosts(posts, users, comments) {
  const postsList = new Posts(document.querySelector('#container'));
  
  for (let item of posts) {
    const postTitle = item.title;
    const postText = item.body;
    let commentsList = [];
    let postAuthor;
    for (let user of users) {
      if (user.id === item.userId) {
        postAuthor = user.name;
        break;
      }
    }
    for(let comment of comments) {
      if (item.id === comment.postId){
        let commentsObj = {};
        commentsObj.name = comment.name;
        commentsObj.text = comment.body;
        commentsObj.email = comment.email;
        commentsList.push(commentsObj);
      }
    }
    const post = new Post(postTitle, postText, postAuthor);
    postsList.addPost(post, commentsList);
  }
  postsList.render();
}

