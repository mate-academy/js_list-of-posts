const table = document.querySelector('tbody');
const tableComent = document.querySelector('.coment');
const BaseUrl = 'https://jsonplaceholder.typicode.com/';

const getDataFromServer = async(url) => {
  const response = await fetch(`${BaseUrl}${url}`)
  return response.json();
};

const getTodosWithUsers = (posts, users, commentsList) => {
  return posts.map(item => ({
    ...item,
    user: users.find(elem => elem.id === item.userId),
    comments: commentsList.filter(elem => elem.postId === item.id),
  }));
};

const getTodosList = async () => {
  const wholePosts = await Promise.all([
    getDataFromServer('posts'),
    getDataFromServer('users'),
    getDataFromServer('comments')
  ]);
  const postsWithComments = getTodosWithUsers(wholePosts[0], wholePosts[1], wholePosts[2]);

  postsWithComments.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>
          ${item.title}
        </td>
        <td>
          ${item.body}
        </td>
        <td>
          ${item.user.name}
        </td>
          ${item.comments.map(x => `<td>Author email: ${x.email}Comment: ${x.body}</td>`).join("")}
      </tr>
    `
  });
};

getTodosList();
