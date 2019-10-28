'use strict'; 

const container = document.querySelector('.posts-container'); 

async function getData(url) {
  const response = await fetch(url); 
  
  return response.json(); 
}

async function generatePostList() {
  const postList = await getData('https://jsonplaceholder.typicode.com/posts'); 
  const usersList = await getData('https://jsonplaceholder.typicode.com/users');
  const commentsList = await getData('https://jsonplaceholder.typicode.com/comments');

  for (let post of postList) {
    let titlePost;
    let textPost;
    let authorName;
    let commentText;
    let commentName;
    let commentContainer = document.createElement('div');
    let commentHeading = document.createElement('div');
    commentContainer.className = 'comments-container';
    commentContainer.classList.add('hide');
    commentHeading.className = 'comments-heading';
    commentHeading.textContent = 'Comments';

    for (let user of usersList) {
      if (post.userId === user.id) {
        titlePost = post.title;
        textPost = post.body;
        authorName = user.name;
        break;
      }
    }

    for (let comment of commentsList) {
      if (post.id === comment.postId) {
        commentText = comment.body;
        commentName = comment.email.split('@').shift().replace(/[^A-Za-z]/g, ' ');

        function generateComments() {
          let commentParagraph = document.createElement('p');
          let commentAuthor = document.createElement('span');
          commentParagraph.className = 'comment';
          commentAuthor.className = 'commentator-name';
          commentParagraph.textContent = commentText;
          commentAuthor.textContent = `By ${commentName}`;
          commentContainer.append(commentParagraph);
          commentContainer.append(commentAuthor);
        }

        generateComments();
      }
    }

    function generatePost() {
      let article = document.createElement('article');
      let articleTitle = document.createElement('h3');
      let paragraph = document.createElement('p');
      let author = document.createElement('span');
      articleTitle.className = 'post-name';
      paragraph.className = 'post';
      author.className = 'author-name';
      articleTitle.textContent = titlePost;
      paragraph.textContent = textPost;
      author.textContent = authorName;
      article.append(articleTitle);
      article.append(paragraph);
      article.append(author);
      article.append(commentHeading);
      article.append(commentContainer);
      container.append(article);

      commentHeading.addEventListener('click', () => {
        commentContainer.classList.toggle('hide');
      })
    }

    generatePost()
  } 
}

generatePostList();