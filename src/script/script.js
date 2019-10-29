const BASE_URL = 'https://jsonplaceholder.typicode.com';
const POSTS = 'posts';
const USERS = 'users';
const COMMENTS = 'comments';
const POSTS_LIST = document.querySelector('.posts_list');

let listOfPosts = [];

const getAll = (url) => {
    return fetch(`${BASE_URL}/${url}`)
        .then(response => response.json())
};

const init = async () => {
    const posts = await getAll(POSTS);
    const users = await getAll(USERS);
    const comments = await getAll(COMMENTS);

    fetchPosts(posts, users, comments);
    console.log(listOfPosts);
};

init();

const fetchPosts = (posts, users, comments) => {
    for (let i = 0; i < posts.length; i++) {
        listOfPosts[i] = {};

        listOfPosts[i].title = posts[i].title;
        listOfPosts[i].body = posts[i].body;
        appendUsersToPosts(posts[i], listOfPosts[i], users);
        listOfPosts[i].comments = appendCommentsToPost(comments, posts[i]);
    }
};

const appendUsersToPosts = (postsListOld, postsListNew, users) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === postsListOld.userId) {
            postsListNew.name = users[i].name;
        }
    }
};

const appendCommentsToPost = (comments, post) => {
    let commentsList = [];
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].postId === post.id) {
            commentsList.push(comments[i].body);
        }
    }

    return commentsList;
};


