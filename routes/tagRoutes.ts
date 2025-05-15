import { Router } from "express";
import { createTag, deleteTag, getTagById, tagList, updateTag } from "../components/tagController";



const router = Router();

// User Routes

router.post("/", createTag);
router.get("/",tagList);
router.get("/:id",getTagById);
router.put("/:id",updateTag);
router.delete("/:id",deleteTag);

export default router;
