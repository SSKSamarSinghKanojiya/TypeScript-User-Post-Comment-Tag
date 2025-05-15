import { Router } from "express";
import { createPostTag, deletePostTag, getPostTagById, postTagList, updatePostTag } from "../components/postTagController";



const router = Router();

// User Routes

router.get('/', postTagList);
router.post('/', createPostTag);
router.get('/:post_id/:tag_id', getPostTagById);
router.patch('/:post_id/:tag_id', updatePostTag);
router.delete('/:post_id/:tag_id', deletePostTag);


export default router;
