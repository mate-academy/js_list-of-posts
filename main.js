const listOfPosts = document.querySelector('.listOfPosts');
const posts = createList('https://jsonplaceholder.typicode.com/posts');
const users = createList('https://jsonplaceholder.typicode.com/users');
const comments = createList('https://jsonplaceholder.typicode.com/comments');

function createList(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    const data = JSON.parse(xhr.responseText);
    return data;
}

function createTemplate(post, user) {
    return `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <p class='userName'><i>${user.name}</i></p>
        <div id="${post.id}" class="comments"></div>
    `;
}

function createComment(comment) {
    return `
        <div class="comment">
            <h3><i>${comment.name}</i></h3>
            <p>${comment.name}</p>
        </div>
    `;
}

posts.forEach(post => {
    const wrapper = document.createElement('div');
    const autor = users.filter((author) => post.userId === author.id);
    const comment = comments.filter((comment) => comment.postId === post.id);
    wrapper.innerHTML = createTemplate(post, autor);
    listOfPosts.append(wrapper);
    const commentsSection = document.getElementById(`${post.id}`);
    comment.forEach((comment) => {
      commentsSection.insertAdjacentHTML('beforeend', createComment(comment));
    });
});
