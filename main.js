const container = document.getElementById('container');
let postsUrl =    'https://jsonplaceholder.typicode.com/posts';
let usersUrl =    'https://jsonplaceholder.typicode.com/users';
let commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

const connect = (url) => {
  return fetch(url)
    .then(response => response .json())
    .catch(err => console.log(err));
};

const fillData = async () => {
  const [posts, users, comments] = await Promise.all([
    connect(postsUrl),
    connect(usersUrl),
    connect(commentsUrl)
  ]);

  for (let item of posts){
    const box = document.createElement('div');
    let commentsUser = comments.filter(post => post.postId === item.id);
    box.innerHTML = `<div class="box"">
                         <img class="img-thumbnail" src="https://www.meme-arsenal.com/memes/9f8982d2fc712953376939b044cfb11a.jpg">
                          <div class="content">
                            <h3 class="header">${item.title}</h3>
                            <h4 class="name">${users.find(user => user.id === item.userId).name}</h4>
                            <h5 class="description">
                              <p>${item.body}</p>
                            </h5>
                          </div>
                          <div class="comments alert alert-primary"> Comments
                            <div class="hidable is-displayed">
                              ${generateComments(commentsUser)}</div>
                            </div>
                        </div>`;
    container.append(box);
  }

  let clickable = [...document.getElementsByClassName('comments')];
  let commentHidable = [...document.getElementsByClassName('hidable')];

  clickable.forEach(item => {
    item.addEventListener('click', () => {
      let index = clickable.indexOf(item);
      commentHidable[index].classList.toggle('is-displayed');
    });
  });

  function generateComments(input) {
    let commentsBlock = ``;
    for (let i = 0; i < input.length; i++) {
      commentsBlock +=
          `<div id="commentName" class="alert alert-warning">${input[i].name}
            <p id="commentText" class="alert alert-success">${input[i].body}</p>
          </div>`
    }
    return commentsBlock
  }
};

fillData();
