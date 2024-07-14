const output = document.getElementById('output');
const button = document.getElementById('getPosts');

const showPosts = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/posts');

    if (!response.ok) {
      throw new Error(`Failed to Fetch Posts`);
    }

    const posts = await response.json();

    output.innerHTML = '';

    posts.forEach((post) => {
      const postEl = document.createElement('div');
      postEl.textContent = post.title;
      output.appendChild(postEl);
    });
  } catch (error) {
    console.error('Error Fetching Posts: `, error');
  }
};

button.addEventListener('click', showPosts);
