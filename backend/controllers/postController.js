import cloudinary from "../configs/cloudinary.js";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";

const prisma = new PrismaClient();

/// Create a Post

export const createBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const userId = req.auth?.userId;

    let imageUrl;
    let imagePublicId;

    if (req.file) {
      const imageBase64 = req.file?.buffer.toString("base64");

      const base64Image = `data:${req.file.mimetype};base64,${imageBase64}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "blogapp",
        overwrite: true,
        public_id: `${userId}_${uuidV4()}`,
        resource_type: "image",
      });

      imageUrl = uploadResponse.secure_url;
      imagePublicId = uploadResponse.public_id;
    }

    const post = await prisma.post.create({
      data: {
        title,
        description,
        category,
        image: imageUrl,
        imageId: imagePublicId,
        userId,
      },
    });

    return res.json({ success: true, message: post });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Update a Blog

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    const userId = req.auth?.userId;

    const blog = await prisma.post.findUnique({ where: { id: parseInt(id) } });

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    if (blog.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    let imageUrl = blog.image;

    if (req.file) {
      const imageToBase64 = req.file?.buffer.toString("base64");

      const base64Image = `data:${req.file.mimetype};base64,${imageToBase64}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "/blogsapp",
        overwrite: true,
        public_id: `${userId}_${uuidV4()}`,
        resource_type: "image",
      });

      imageUrl = uploadResponse.secure_url;
    }

    const updateBlog = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, description, category, image: imageUrl },
    });

    return res.json({ success: true, message: updateBlog });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Delete a blog

export const deleteBlog = async (req, res) => {
  try {
    const blogId = parseInt(req.params.id);
    const userId = req.auth.userId;

    const blog = await prisma.post.findUnique({
      where: { id: parseInt(blogId) },
    });

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    if (blog.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    await prisma.post.delete({ where: { id: blogId } });

    return res.json({ success: true, message: "Blog deleted Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Fetch Blog according to the logged user

export const fetchLoggedUserBlogs = async (req, res) => {
  try {
    const userId = req.auth.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }
    const userWithBlogs = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: true,
      },
    });

    return res.json({ success: true, message: userWithBlogs?.posts || [] });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
