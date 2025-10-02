import { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();

  const { myBlogs, updateBlog } = useAppContext();

  const blogDetails = myBlogs.find((blog) => blog.id === Number(id));

  const [title, setTitle] = useState(blogDetails?.title || "");
  const [description, setDescription] = useState(
    blogDetails?.description || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    blogDetails?.category || "art"
  );
  const [imageFile, setImageFile] = useState(blogDetails?.image || null);

  const categories = [
    "art",
    "science",
    "technology",
    "cinema",
    "design",
    "food",
  ];

  const handleImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormData = async (e) => {
    e.preventDefault();

    if (!title || !description || !selectedCategory) {
      alert("Please fill all fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    if (imageFile) formData.append("image", imageFile);
    console.log([...formData.entries()]);
    // try {

    // } catch (error) {
    //   console.log(error);
    // }

    updateBlog(id, formData);
  };

  return (
    <form
      onSubmit={handleFormData}
      className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mt-12 py-10"
    >
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="w-full py-2 outline-none border border-gray-300 pl-2.5 rounded-md  focus:ring-2 ring-primary ring-offset-2"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="20"
          cols=""
          className="mt-5 w-full outline-none border border-gray-300 py-5 px-4 rounded-md focus:ring-2 ring-primary ring-offset-2"
          placeholder="Enter your blog description "
          required
        ></textarea>
      </div>
      <div className="">
        {/* Image Upload */}
        <div className="border border-gray-200 p-2.5 rounded-md">
          <h1 className="text-lg">Image Upload</h1>

          {/* <img src="https://placehold.co/500x200" alt="image placeholder" className="mt-2.5" /> */}

          {imageFile ? (
            <img
              src={blogDetails.image}
              alt="blog image"
              className="max-h-[150px] object-cover mt-5 rounded-md"
            />
          ) : (
            <div className="min-h-[150px] border border-gray-200 flex items-center justify-center bg-slate-100 mt-6">
              <span>
                <FaRegImage size={40} className="text-gray-600" />
              </span>
            </div>
          )}

          <label
            htmlFor="file"
            className="bg-primary text-white px-1.5 py-2 cursor-pointer inline-block mt-5 rounded-[2px]"
          >
            Upload Image
          </label>

          <input
            onChange={handleImage}
            accept="image/*"
            id="file"
            type="file"
            hidden
          />
        </div>

        {/* Category Selection */}
        <div className="border border-gray-200 p-2.5 rounded-md mt-4">
          <h1 className="text-lg">Category</h1>

          <div className="mt-1.5 space-y-2.5">
            {categories.map((option) => (
              <label
                key={option}
                className="flex flex-row items-center gap-2.5 cursor-pointer"
              >
                <input
                  checked={selectedCategory === option}
                  id={option}
                  value={option}
                  name="category"
                  type="radio"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                {option
                  ? option.charAt(0).toUpperCase() +
                    option.slice(1).toLowerCase()
                  : ""}
              </label>
            ))}
          </div>
        </div>
        {/* <button className="bg-primary text-white px-1.5 py-2 cursor-pointer inline-block rounded-[2px]">
          Post
        </button> */}
      </div>

      <button
        type="submit"
        className=" bg-primary text-white px-1.5 py-2 cursor-pointer inline-block mt-5 rounded-[2px]"
      >
        Post
      </button>
    </form>
  );
};

export default Edit;
