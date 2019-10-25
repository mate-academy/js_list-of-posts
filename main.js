
const body = document.getElementById('body');
const posts = 'https://jsonplaceholder.typicode.com/posts';
const users = 'https://jsonplaceholder.typicode.com/users';
const comments = 'https://jsonplaceholder.typicode.com/comments';

function fetching(url) {
  return fetch(url).then(response => response.json());
}

async function crearedTable() {
  const listPosts = await fetching(posts);
  const listUsers = await fetching(users);
  const listComments = await fetching(comments);

  for (post of listPosts) {
    const user = listUsers.find(item => item.id === post.userId).name;
    const posts = post.title
    const comment = listComments.filter(item => item.postId === post.id);

    const card = document.createElement('div');
    const content = document.createElement('div');
    const miniAvatar = document.createElement('img');
    const mainAvatar = document.createElement('img');
    const avatar = document.createElement('div');
    const cardComments = document.createElement('div')

    function generatorAvatar() {
      let num = Math.ceil(Math.random() * 10)

      switch (num) {
        case 1:
        case 2:

          return 'https://semantic-ui.com/images/avatar2/large/kristy.png';
        case 3:
        case 4:

          return 'https://semantic-ui.com/images/avatar2/large/matthew.png';
        case 5:
        case 6:

          return 'https://semantic-ui.com/images/avatar2/large/molly.png';
        case 7:
        case 8:

          return 'https://semantic-ui.com/images/avatar/large/jenny.jpg';
        case 9:
        case 10:

          return 'https://semantic-ui.com/images/avatar2/large/elyse.png';
      }

      return num
    };

    content.classList.add('content');
    miniAvatar.classList.add('ui', 'avatar', 'image');
    avatar.classList.add('image');
    cardComments.classList.add('content');
    cardComments.textContent = 'Комментарии';
    card.classList.add('ui', 'card');

    content.append(miniAvatar);
    card.append(content);
    card.append(avatar);
    card.append(cardComments);
    avatar.append(mainAvatar);
    body.append(card);

    content.insertAdjacentHTML('beforeend', user);
    avatar.insertAdjacentHTML('beforeend', posts);
    miniAvatar.src = generatorAvatar();
    mainAvatar.src = generatorAvatar();

    for (let i = 0; i < comment.length; i++) {
      const cardComment = document.createElement('div');
      const comments = document.createElement('div');
      const textComment = document.createElement('div');
      const href = document.createElement('a');
      const authorComment = document.createElement('a');
      const photoComment = document.createElement('img');
      const bodyComment = document.createElement('div');

      comments.classList.add('comment');
      cardComment.classList.add('ui', 'comments');
      textComment.classList.add('text');
      href.classList.add('avatar');
      bodyComment.classList.add('content');
      authorComment.classList.add = ('author');

      body.append(cardComment);
      cardComment.append(comments);
      comments.append(href);
      href.append(photoComment);
      comments.append(bodyComment);
      bodyComment.append(authorComment);
      authorComment.append(textComment);

      authorComment.append(comment[i].email);
      photoComment.src = generatorAvatar();
      textComment.append(comment[i].body);
    }
  }
}

crearedTable();