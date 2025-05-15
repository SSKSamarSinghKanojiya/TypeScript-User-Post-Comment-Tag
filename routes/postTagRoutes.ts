import { Router } from "express";
import { createPostTag, deletePostTag, getPostTagById, postTagList, updatePostTag } from "../components/postTagController";



const router = Router();

// User Routes

// router.post("/", createPostTag);
// router.get("/",postTagList);
// router.get("/:id",getPostTagById);
// router.put("/:id",updatePostTag);
// router.delete("/:id",deletePostTag);
router.get('/', postTagList);
router.post('/', createPostTag);
router.get('/:post_id/:tag_id', getPostTagById);
router.patch('/:post_id/:tag_id', updatePostTag);
router.delete('/:post_id/:tag_id', deletePostTag);


export default router;
