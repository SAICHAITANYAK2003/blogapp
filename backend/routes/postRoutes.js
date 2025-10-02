import express from "express";
import { requireAuth } from "@clerk/express";
import { upload } from "../configs/mutler.js";
import {
  createBlog,
  fetchLoggedUserBlogs,
  updateBlog,
} from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.post(
  "/post/blog",
  requireAuth(),
  upload.single("image"),
  createBlog
);

postRouter.get("/post/myblogs", requireAuth(), fetchLoggedUserBlogs);
postRouter.put("/edit/blog/:id", requireAuth(),upload.single('image'), updateBlog);
export default postRouter;
