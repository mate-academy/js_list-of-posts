const baseURL = 'https://jsonplaceholder.typicode.com';

const getResponse = async (url) => {
  const response = await fetch(url);

  return response.json();
};

const createPosts = async () => {
  const [posts, users, comments] = await Promise.all([getResponse(`${baseURL}/posts`), getResponse(`${baseURL}/users`), getResponse(`${baseURL}/comments`)]);
  
  for (const post of posts) {
    const postComments = comments.filter(comment => comment.postId === post.id);
    const user = users.find(user => user.id === post.userId);
    document.body.appendChild(createPost(post.title, post.body, user.username, postComments));
  }
};



const createPost = (title, text, authorName, comments = []) => {
  const post = document.createElement('div');
  const postBody = document.createElement('a');
  const postContent = document.createElement('div');
  const postTitle = document.createElement('div');
  const postText = document.createElement('div');
  const extraContent = document.createElement('div');
  const postAuthorContainer = document.createElement('div');
  const postAuthorIcon = document.createElement('img');
  const postAuthorName = document.createElement('span');
  const postComments = document.createElement('div');
  const postCommentsText = document.createElement('h3');
  

  post.className = 'post';
  postBody.className = 'ui card';
  postContent.className = 'content';
  postTitle.className = 'header';
  postText.className = 'description';
  extraContent.className = 'extra content';
  postAuthorContainer.className = 'right floated author';
  postAuthorIcon.className = 'ui avatar image';
  postComments.className = 'ui comments';
  postCommentsText.className = 'ui dividing header';


  postTitle.textContent = title;
  postText.textContent = text;
  postAuthorName.textContent = authorName;
  postAuthorIcon.src = 'userImages/user1.jpg';
  postCommentsText.textContent = 'Comments';

  postComments.appendChild(postCommentsText);
  postContent.append(postTitle, postText);
  postAuthorContainer.append(postAuthorIcon, postAuthorName);
  extraContent.appendChild(postAuthorContainer);
  postBody.append(postContent, extraContent);
  

  for (const comment of comments) {
    postComments.appendChild(createComment(comment.email, comment.body));
  }

  post.append(postBody, postComments);
  
  return post;
};

const createComment = (userName, text) => {
  const comment = document.createElement('div');
  const avatarContainer = document.createElement('a');
  const avatar = document.createElement('img');
  const commentContant = document.createElement('div');
  const authorName = document.createElement('a');
  const metaDate = document.createElement('div');
  const date = document.createElement('span');
  const commentText = document.createElement('div');
  const actions = document.createElement('div');
  const action = document.createElement('a');


  comment.className = 'comment';
  avatarContainer.className = 'avatar';
  commentContant.className = 'content';
  authorName.className = 'author';
  metaDate.className = 'metadata';
  date.className = 'date';
  commentText.className = 'text';
  actions.className = 'actions';
  action.className = 'reply';


  avatar.src = 'userImages/user2.jpg';
  authorName.textContent = userName;
  date.textContent = 'Сегодня вечером в 5:42';
  commentText.textContent = text;
  action.textContent = 'Reply';


  avatarContainer.appendChild(avatar);
  metaDate.appendChild(date);
  actions.appendChild(action);
  commentContant.append(authorName, metaDate, commentText, actions);

  comment.append(avatarContainer, commentContant);

  return comment;
};

createPosts();

