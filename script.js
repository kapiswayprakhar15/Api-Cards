// Retrieve only the first 10 items from the list of Posts
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        const Requiredposts = posts.slice(0, 10);
        CardDisplayed(Requiredposts);
    });

// Displaying Cards
function CardDisplayed(posts) {
    const container = document.getElementById('PostContainer');
    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<div><p>${post.title}</p>
        <h3>${post.body}</h3><h4>Today - 2h min read</h4></div>
        <div><img src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?cs=srgb&dl=pexels-pixabay-56866.jpg&fm=jpg" alt="Random Image" width="200" height="200"></div>`;
        container.appendChild(card);
    });
}

// Popup Function
function OpenPopup() {
    document.getElementById('popup').style.display = 'block';
}


// Add Post Function
function AddPost() {
    const title = document.getElementById('input_title').value;
    const body = document.getElementById('input_body').value;
    // Checking the Validation for empty string
    if (title.trim() === '' || body.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }


    // Request body format for post
    const newPost =
    {
        title,
        body,
        userId: 1
    };

    // Adding post 
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: 
            {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(newPost)
    })
        .then(response => response.json())
        .then(post => {
            document.getElementById('popup').style.display = 'none';
            prependPost(post);
        })
        .catch(error => {
            alert('Post adding failed.');
        });
}

// Adding Card at the top of the previous cards
function prependPost(post) {
    const container = document.getElementById('PostContainer');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<div><p>${post.title}</p>
    <h3>${post.body}</h3>
    <h4>Today - 2h min read</h4>
    </div>
    <div><img src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?cs=srgb&dl=pexels-pixabay-56866.jpg&fm=jpg" alt="Random Image" width=200" height="200"></div>`;
    container.insertBefore(card, container.firstChild);
}