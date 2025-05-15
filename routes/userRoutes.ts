import { Router } from "express";
import { deleteUser, getAllUser, getUser, getUserById, login, register, updateUser } from "../components/userController";
import verifyJWT from "../middleware/authMiddleware";


const router = Router();

// User Routes

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyJWT, getUser);
router.get("/", verifyJWT, getAllUser);
router.get("/:id", verifyJWT, getUserById);
router.put("/:id", verifyJWT, updateUser);
router.delete("/:id", verifyJWT, deleteUser);

export default router;
