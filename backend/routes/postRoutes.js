import express from "express";
import { requireAuth } from "@clerk/express";
import { upload } from "../configs/mutler.js";
import {
  createBlog,
  deleteBlog,
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

postRouter.get("/get/myblogs", requireAuth(), fetchLoggedUserBlogs);
postRouter.put(
  "/edit/blog/:id",
  requireAuth(),
  upload.single("image"),
  updateBlog
);
postRouter.delete("/blogs/:id", requireAuth(), deleteBlog);
export default postRouter;
