import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth, useUser } from "@clerk/clerk-react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myBlogs, setMyBlogs] = useState([]);
  const { getToken } = useAuth();
  const { user } = useUser();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const createUser = useCallback(async () => {
    if (!user) return;

    const userDetails = {
      id: user.id,
      name: user.firstName + " " + (user.lastName || ""),
      email: user.emailAddresses[0].emailAddress,
    };

    console.log(userDetails);

    try {
      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/user/upsert`,
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }, [user]);

  const createBlog = async (formData) => {
    // 1. Create a temporary ID (optimistic blog)
    const tempId = `temp-${Date.now()}`;
    const optimisticBlog = {
      id: tempId,
      ...formData,
      createdAt: new Date().toISOString(),
      image: formData.image || "https://placehold.co/600x400/png",
      userId: user?.id,
    };

    setMyBlogs((prev) => [optimisticBlog, ...prev]);

    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/post/blog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setMyBlogs((prev) =>
          prev.map((blog) => (blog.id === tempId ? data.message : blog))
        );

        toast.success("Blog Posted Successfully");
      } else {
        console.log(data.message);
        toast.error(data.message);
        setMyBlogs((prev) => prev.filter((blog) => blog.id !== tempId));
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setMyBlogs((prev) => prev.filter((blog) => blog.id !== tempId));
    }
  };

  const updateBlog = async (blogId, formData) => {
    try {
      const token = await getToken();
      const { data } = await axios.put(
        `${backendUrl}/api/edit/blog/${blogId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setMyBlogs((prev) =>
          prev.map((blog) => (blog.id === blogId ? data.message : blog))
        );

        toast.success("Blog Updated Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const token = await getToken();

      const { data } = await axios.delete(`${backendUrl}/api/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const loggedUserBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/get/myblogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        console.log(data);
        setMyBlogs(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [getToken, backendUrl]);

  //Fetch All Blogs
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/blogs`);
      console.log(data.message);
      setBlogs(data.message);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchBlogs();
    loggedUserBlogs();
  }, [fetchBlogs, loggedUserBlogs]);

  useEffect(() => {
    if (user) {
      createUser();
    }
  }, [user, createUser]);

  const value = useMemo(
    () => ({
      blogs,
      loading,
      createBlog,
      myBlogs,
      updateBlog,
      deleteBlog,
    }),
    [blogs, loading, createBlog, myBlogs, updateBlog, deleteBlog]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};

// const randomDate = () => {
//   const currDate = new Date();
//   const pastDate = new Date();
//   pastDate.setFullYear(currDate.getFullYear() - 1);

//   return new Date(
//     pastDate.getTime() + Math.random() * (currDate.getTime() - pastDate.getTime())
//   );
// };
