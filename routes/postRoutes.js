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
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post with id ${id} not found`);
    return next(error);
  }
  res.status(200).json(post);
});

// Create a post
router.post('/', (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    const error = new Error('Please include a title');
    return next(error);
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
router.put('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post with id ${id} not found`);
    return next(error);
  }

  const { title } = req.body;

  if (!title) {
    const error = new Error('Please include a title');
    return next(error);
  }

  post.title = title;
  res.status(200).json(post);
});

// Delete a post
router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post with id ${id} not found`);
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json({ message: `Post with id ${id} deleted` });
});

export default router;
