'use strict';

function getJson(url, method = 'GET', async = false) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url, async);
  xhr.send();

  try {
    return JSON.parse(xhr.responseText);
  } catch {
    throw new Error('invalid JSON');
  }
}
const userList = new Map();

const posts = getJson('https://jsonplaceholder.typicode.com/posts');

const users = getJson('https://jsonplaceholder.typicode.com/users').forEach(
  user => {
    userList.set(user.id, user.name);
  }
);

const comments = getJson('https://jsonplaceholder.typicode.com/comments');

console.log(posts, users, comments);

class Element {
  constructor(tag, content) {
    this.tag = tag;
    this.content = content;
  }

  render() {
    const element = document.createElement(this.tag);

    element.textContent = this.content;
    return element;
  }
}

const mainSection = new Element('section').render();

posts.forEach(post => {
  const section = new Element('section').render();
  const title = new Element('p', post.title).render();
  const body = new Element('p', post.body).render();
  const authorName = new Element('p', userList.get(post.userId)).render();
  const subSection = new Element('section').render();
  const comments = getComments(post.id);

  comments.forEach(comment => {
    const title = new Element('p', comment.name).render();
    const body = new Element('p', comment.body).render();
    subSection.append(title, body);
  });
  section.append(title, body, authorName, subSection);
  mainSection.append(section);
});

document.body.append(mainSection);

function getComments(id) {
  const currentComments = comments.filter(comment => {
    return comment.id === id;
  });
  return currentComments;
}
