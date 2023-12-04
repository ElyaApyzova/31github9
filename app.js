const createPost = (comment, photo) => {
  return `
    <div class="card">
      <img src="${photo.url}" class="card-img-top" alt="...">
      
      <div class="card-body">
        <h5 class="card-title">${comment.postId}</h5>
        <p class="card-text">${comment.id}</p>
      </div>
      
      <ul class="list-group">
        <li class="list-group-items list-first">${comment.name}</li>
        <li class="list-group-items list-second">${comment.email}</li>
        <li class="list-group-items  list-third">${comment.body}</li>
      </ul>
      
      <div class="card-btn">
        <a href="https://jsonplaceholder.typicode.com/comments" target="_blank" class="card-link">Know more</a>
      </div>
    </div>
  `;
};

let items = [];
let page = 1;

const loadMore = () => {
  fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}`)
    .then((response) => response.json())
    .then((comments) => {
      fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}`)
        .then((response) => response.json())
        .then((photos) => {
          photos.forEach((photo, index) => {
            let comment = comments[index];
            let item = createPost(comment, photo);
            items.push(item);
          });
        })
        .then(() => {
          let cards = items.join("");
          document.getElementById("comments").innerHTML = cards;
          page++;
        });
    })
    .catch((error) => {
      console.error("Oops, an error occurred:", error);
    });
};

loadMore();
