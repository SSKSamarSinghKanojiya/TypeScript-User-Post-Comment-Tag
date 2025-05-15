import { Router } from "express";
import { commentList, createComment, deleteComment, getCommentById, updateComment } from "../components/commentController";
import verifyJWT from "../middleware/authMiddleware";




const router = Router()



router.post("/",verifyJWT,createComment)
router.get("/",commentList)
router.get("/:id",getCommentById)
router.put("/:id",verifyJWT,updateComment)
router.delete("/:id",verifyJWT,deleteComment)


export default router