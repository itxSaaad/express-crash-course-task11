import express from 'express';

// Create a new router
const router = express.Router();

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
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
});

// Get single post
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({ message: `Post with id ${id} not found` });
  }
  res.status(200).json(post);
});

// Create a post
router.post('/', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Please include a title' });
  }

  const id = posts.length + 1;
  const newPost = {
    id,
    title,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update a post
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({ message: `Post with id ${id} not found` });
  }

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Please include a title' });
  }

  post.title = title;
  res.status(200).json(post);
});

export default router;
