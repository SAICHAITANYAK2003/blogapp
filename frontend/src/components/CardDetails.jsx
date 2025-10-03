import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { formatDistanceToNow } from "date-fns";
import { MdEditNote } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMemo } from "react";
import { useUser } from "@clerk/clerk-react";

const CardDetails = () => {
  const { id } = useParams();
  const blogId = Number(id);
  const { myBlogs, loading, deleteBlog, blogs } = useAppContext();
  const navigate = useNavigate();
  const { user } = useUser();

  const blogDetails =
    myBlogs.find((item) => item.id === blogId) ||
    blogs.find((item) => item.id === id);

  const otherBlogs = useMemo(() => {
    return myBlogs
      .filter((blog) => blog.id !== blogId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
  }, [myBlogs, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4">Loading blog...</p>
      </div>
    );
  }

  if (!blogDetails) {
    return <div className="p-10 text-center">Blog not found...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] p-10 mt-5 min-h-screen gap-x-20 mx-auto">
      {/* Left Blog Details */}
      <div>
        <img
          src={blogDetails.image || "https://placehold.co/600x400/png"}
          alt={blogDetails.title}
          className="w-full max-h-[400px] max-w-2xl rounded mb-6"
        />

        {/* Blog user Details */}
        <div className="flex items-center gap-2.5 mt-5">
          <img
            src={
              blogDetails.avatar || "https://avatar.iran.liara.run/public/12"
            }
            alt="avatar"
            className="w-13 aspect-auto rounded-full ring-2 ring-offset-2 ring-gray-300"
          />

          <div>
            <h1 className="font-semibold">{blogDetails.username}</h1>
            <p className="text-gray-500 text-[12px]">
              Posted on{" "}
              {formatDistanceToNow(new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>

          {/* Blog Edit Buttons */}
          <div className="ml-5 flex items-center gap-4">
            {user?.id === blogDetails.userId && (
              <>
                <button
                  onClick={() => navigate(`/edit/blog/${id}`)}
                  className="bg-primary/90 text-white p-2 rounded-full cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2"
                >
                  <MdEditNote size={20} />
                </button>

                {loading ? (
                  <div class="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                ) : (
                  <button
                    onClick={() => deleteBlog(blogId)}
                    className="bg-red-600  text-white p-2 rounded-full cursor-pointer hover:ring-2 hover:ring-red-600 hover:ring-offset-2"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="text-lg text-gray-600 mt-6">
          <h1 className="text-3xl font-bold mb-4">{blogDetails.title}</h1>
          <p> {blogDetails.description || "No Blog  Content Available"}</p>
        </div>
      </div>

      {/* Right Other Blogs */}
      <aside className="mt-40 md:mt-10 md:m-0">
        <h1 className="text-2xl text-gray-600 font-bold">
          Other Posts you may like
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-7">
          {otherBlogs.map((blog) => (
            <div key={blog.id} className="mt-8 flex flex-col items-start">
              <img
                className="w-[300px] aspect-auto"
                src={blog.image || "https://placehold.co/600x400/png"}
                alt={`${(`other-blog`, blog.title)}`}
              />

              <h1 className="text-[15px] md:text-2xl text-slate-700 font-bold  mt-2.5 min-w-[20px] max-w-[300px] break-words">
                {blog.title}
              </h1>

              <button
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="px-3 py-2 mt-5 cursor-pointer border border-primary bg-transparent text-primary hover:text-white hover:bg-primary"
              >
                Read more
              </button>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default CardDetails;
