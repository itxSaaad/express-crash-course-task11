import express from 'express';
import path, { parse } from 'path';

const app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

// Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// API routes
// app.get('/', (req, res) => {
//   res.send(
//     `<section style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
//       <h1 style="color: #4CAF50;">Hello, Code Wizard!</h1>
//       <h3 style="color: #FF9800;">Got a moment?</h3>
//       <p style="font-size: 1.2em;">Your API is not just running; it's sprinting like Usain Bolt!</p>
//       <div style="margin-top: 20px;">
//         <p style="font-size: 1.5em; font-weight: bold;">Everything is Awesome!</p>
//         <p style="font-size: 1.2em;">💻✨🚀</p>
//       </div>
//       <footer style="margin-top: 30px; font-size: 0.8em; color: #9E9E9E;">
//         <p>Need more magic? Explore the code and unleash your creativity!</p>
//         <p>Happy coding, developer! 🎉</p>
//       </footer>
//     </section>`
//   );
// });

let posts = [
  {
    id: 1,
    title: 'Post 1',
  },
  {
    id: 2,
    title: 'Post 2',
  },
  {
    id: 3,
    title: 'Post 3',
  },
];

//  Get all posts
app.get('/api/posts', (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
});

// Get single post
app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `Post with id ${id} not found` });
  }
});

// Serve static files
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'about.html'));
// });

app.listen(PORT, () => {
  console.log(`Server is running in ${NODE_ENV} mode on Port ${PORT}!`);
});
