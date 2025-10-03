import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { blogs, loading } = useAppContext();

  console.log("🔥 Blogs rendered");

  const getFirstSentence = (body) => {
    if (!body) return;
    const splitText = body.split(".")[0];
    return splitText;
  };
  return (
    <div className="mt-16">
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-5">Loading Blogs ...</p>
        </div>
      ) : (
        <div>
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className={`flex flex-col justify-around items-center px-3 ${
                index % 2 === 0 ? "md:flex-row " : "md:flex-row-reverse"
              } mb-28 gap-5`}
            >
              {/* Blog Details */}
              <div className="">
                <h1 className="font-semibold leading-16 text-5xl max-w-lg">
                  {blog?.title}
                </h1>
                <p className="mt-5 text-gray-500 max-w-2xl">
                  {getFirstSentence(blog?.description)} ...
                </p>
                <button
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="px-3 py-2 mt-5 cursor-pointer border border-primary bg-transparent text-primary hover:text-white hover:bg-primary"
                >
                  Read more
                </button>
              </div>
              {/* Background Image */}
              <div className="relative w-[500px] mt-2">
                {/* Background layer */}
                <div
                  className={`absolute rounded-md  w-full h-full bg-seconday ${
                    index % 2 === 0 ? "top-5 right-4" : "top-5 left-3"
                  }`}
                ></div>

                {/* Image layer */}
                <img
                  src={blog.image}
                  alt="blog image"
                  className="relative w-full hover:-translate-y-2 transition-transform duration-300 rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
