const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
const urlUsers = 'https://jsonplaceholder.typicode.com/users';
const urlComments = 'https://jsonplaceholder.typicode.com/comments';

const posts = document.getElementById('posts');

const render = (item) => {
    const post = document.createElement('li');
    post.classList.add('post');

    const postHeader = document.createElement('header');
    postHeader.classList.add('post-header');
    postHeader.textContent = item.title;
    post.append(postHeader);

    const postText = document.createElement('p');
    postText.classList.add('post-text');
    postText.textContent = item.body;
    post.append(postText);

    const postAuthor = document.createElement('p');
    postAuthor.classList.add('post-author');
    postAuthor.textContent = item.user.name;
    post.append(postAuthor);

    const comments = document.createElement('ul');
    comments.textContent = 'Comments:';
    comments.classList.add('comment-list');
    item.comments.forEach(currentComment => {
        const comment = document.createElement('li');
        comment.classList.add('comment');

        const commentAuthor = document.createElement('p');
        commentAuthor.textContent = currentComment.name;
        comment.append(commentAuthor);

        const commentText = document.createElement('p');
        commentText.textContent = currentComment.body;
        comment.append(commentText);

        comments.append(comment);
    });
    post.append(comments);

    posts.append(post);
};

const getData = async (url) => {
    return fetch(url)
        .then(response => response.json());
};

const init = async () => {
    const [posts, users, comments] = await Promise.all(
        [getData(urlPosts), getData(urlUsers), getData(urlComments)]
    );

    posts.forEach(post => {
        post.user = users.find(user => user.id === post.userId);
        post.comments = comments.filter(comment => comment.postId === post.id);
    });
    posts.forEach(render);
};

init();
