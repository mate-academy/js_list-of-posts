'use strict'

class Posts {
  constructor(container) {
    this.container = container;
    this.posts = [];
  }

  addPost(post, comments) {
    const postObj = {};
    postObj.post = post;
    postObj.comments = comments;
    this.posts.push(postObj);
  }

  render() {
    for (let post of this.posts) {
      let commentsList = '';
      for (let comments of post.comments) {
        commentsList += `
        <h3>
          ${comments.name}
        </h3>
        <p>${comments.text}<p>
        <h4><a href="#">${comments.email}</a></h4>`
      }
      this.container.insertAdjacentHTML('beforeend' , `
      <section>
        <h2>${post.post.title}</h2>
        <p>${post.post.text}</p>
        <h4>Author: ${post.post.author}</h4>
        <section class="comments">
          <h2>Comments</h2>
          ${commentsList}
        </section>
      </section>`);
    }
  }
}
