const BASE_URL = 'https://jsonplaceholder.typicode.com';
const POSTS = 'posts';
const USERS = 'users';
const COMMENTS = 'comments';
const POSTS_LIST = document.querySelector('.posts_list');
const CLICK_TO_READ_COMMENTS = 'click to read comments';

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
    let data = Object.keys(listOfPosts[0]);
    generateTableHead(POSTS_LIST, data);
    generateTable(POSTS_LIST, listOfPosts);

    addClickListener();
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

const generateTableHead = (table, data) => {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
};

const generateTable = (table, data) => {
    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            appendCommentsToTable(cell, text, element[key], key);
        }
    }
};

const appendCommentsToTable = (cell, text, element, key) => {
    if (key === 'comments') {
        let cmnts = element;
        let ul = document.createElement("ul");
        appendLiToUl(cmnts, ul);
        ul.hidden = true;
        appendSpanClickHere(cell);
        cell.className = 'list';

        cell.appendChild(ul);
    } else {
        cell.appendChild(text);
    }
};

const appendLiToUl = (cmnts, ul) => {
    cmnts.forEach(function (name) {
        let li = document.createElement("li");
        ul.appendChild(li);
        li.innerHTML += name;
    });
};

const appendSpanClickHere = (cell) => {
    let click_here = document.createElement("span");
    click_here.textContent = CLICK_TO_READ_COMMENTS;
    cell.appendChild(click_here);
};

const addClickListener = () => {
    document.querySelectorAll('.list')
        .forEach(elem => elem.addEventListener('click', (action) => {
            showComments(action);
        }));
};

const showComments = (action) => {
    const click_here = action.currentTarget.children[0];
    const children = action.currentTarget.children[1];
    if (children.hidden === true) {
        click_here.hidden = true;
        children.hidden = false;
    } else {
        click_here.hidden = false;
        children.hidden = true;
    }
};





