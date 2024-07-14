import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from '../controllers/postControllers.js';

// Create a new router
const router = express.Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPostById).put(updatePost).delete(deletePost);

export default router;
