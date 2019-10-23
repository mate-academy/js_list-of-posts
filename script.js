function table() {
    let table = document.querySelector('.table');
    table.innerHTML = `
    <table class="ui red table">
        <thead>
            <th>Title</th>
            <th>The text of the post</th>
            <th>Authors name</th>
            <th>post comments</th>
        </thead>
        <tbody id='tableBody'></tbody>
    </table>
    `

    let list = async function () {

        let response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        let posts = await response.json();
        let response1 = await fetch(`https://jsonplaceholder.typicode.com/users`)
        let usersList = await response1.json();
        let response2 = await fetch(`https://jsonplaceholder.typicode.com/comments`)
        let comments = await response2.json();

        let tbody = document.getElementById('tableBody')

        for (let post of posts) {    

            let tdPosts = document.createElement('td'); 
            let poxtText = document.createElement('td');    
            let tdComments = document.createElement('td');
            let rows = document.createElement('tr');
            let miniRows = document.createElement('tr'); 

            tdPosts.textContent = post.title;     
            poxtText.textContent = post.body;                  
     
            for (let user of usersList) {
                if (user.id === post.userId) {

                    let tdAuthors = document.createElement('td');  
                    
                    post.userId = user;
                    tdAuthors.textContent = post.userId.name;
                    
                    for (let comment of comments) {
                        if (comment.postId === post.id) {
                            comment.postId = post;
                        
                            let commentAuthor = document.createElement('td'); 
                            let commentText = document.createElement('td'); 

                            commentAuthor.textContent = comment.name;
                            commentText.textContent = comment.body;
                            commentText.className = 'commentText';
                            commentAuthor.className = 'commentAuthor';
                            
                            miniRows.append(commentAuthor, commentText);
                            tdComments.appendChild(miniRows)
                            rows.append(tdPosts, poxtText, tdAuthors, tdComments);
                            tbody.appendChild(rows); 
                        }
                    }  
                }
            }                                 
        }         
    }
    list()    
}
table();