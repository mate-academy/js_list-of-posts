const container = document.querySelector('.container');

function CreateTodosList(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    const parsedData = JSON.parse(xhr.responseText);

    return parsedData;
}

const posts = CreateTodosList('https://jsonplaceholder.typicode.com/posts');
const users = CreateTodosList('https://jsonplaceholder.typicode.com/users');
const comments = CreateTodosList('https://jsonplaceholder.typicode.com/comments');

function createTemplate(post, user) {
    return `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <i>${user.name}</i>
        <section id="${post.id}" class="comments"></section>
    `;
}

function createComment(comment) {
    return `
        <div class="comment">
            <h4>${comment.name}</h4>
            <p>${comment.name}</p>
        </div>
    `;
}

posts.forEach(post => {
    const postWrapper = document.createElement('article');

    const postsAuthor = users.find((author) => post.userId === author.id);
    const postsComments = comments.filter((comment) => comment.postId === post.id);
 
    postWrapper.innerHTML = createTemplate(post, postsAuthor);

    container.append(postWrapper);

    const commentsSection = document.getElementById(`${post.id}`);

    postsComments.forEach((comment) => {
        commentsSection.insertAdjacentHTML('beforeend', createComment(comment));
    });
});
