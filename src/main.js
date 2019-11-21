const table = document.querySelector('tbody');
const tableComent = document.querySelector('.coment');
const BaseUrl = 'https://jsonplaceholder.typicode.com/';

const getDataFromServer = async(url) => {
  const response = await fetch(`${BaseUrl}${url}`)
  return response.json();
};

const getTodosWithUsers = (posts, users, commentsList) => {
  return posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: commentsList.filter(coment => coment.postId === post.id),
  }));
};

const getTodosList = async () => {
  const wholePosts = await Promise.all([
    getDataFromServer('posts'),
    getDataFromServer('users'),
    getDataFromServer('comments')
  ]);
  const postsWithComments = getTodosWithUsers(wholePosts[0], wholePosts[1], wholePosts[2]);

  postsWithComments.forEach(post => {
    table.innerHTML += `
      <tr>
        <td>
          ${post.title}
        </td>
        <td>
          ${post.body}
        </td>
        <td>
          ${post.user.name}
        </td>
          ${post.comments.map(coment => (
            `<td>Author email: ${coment.email}Comment: ${coment.body}</td>`
          )).join("")}
      </tr>
    `
  });
};

getTodosList();
