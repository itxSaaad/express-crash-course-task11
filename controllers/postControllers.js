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

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public

const getAllPosts = async (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public

const getPostById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post with id ${id} not found`);
    return next(error);
  }
  res.status(200).json(post);
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Public

const createPost = async (req, res, next) => {
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
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Public

const updatePost = async (req, res, next) => {
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
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Public

const deletePost = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post with id ${id} not found`);
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json({ message: `Post with id ${id} deleted` });
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
