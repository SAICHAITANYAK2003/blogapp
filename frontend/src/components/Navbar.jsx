import { assets } from "../assets/assets";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineViewCozy } from "react-icons/md";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white relative transition-all">
      <NavLink to="/">
        <img src={assets.logo} alt="logo" className="w-18" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink
          to="/write"
          className="bg-seconday/30 hover:bg-seconday  px-5 py-1.5 rounded-2xl flex items-center gap-2"
        >
          <span>
            <FaPencilAlt />
          </span>
          Write
        </NavLink>

        <NavLink
          to="/my-blogs"
          className="bg-seconday/30 hover:bg-seconday  px-5 py-1.5 rounded-2xl flex items-center gap-2"
        >
          <span>
            <MdOutlineViewCozy size={22} />
          </span>
          My Blogs
        </NavLink>
        {/* <NavLink to="/art">Art</NavLink>
        <NavLink to="/science">Science</NavLink>
        <NavLink to="/technology">Technology</NavLink>
        <NavLink to="/cinema">Cinema</NavLink>
        <NavLink to="/design">Design</NavLink>
        <NavLink to="/food">Food</NavLink> */}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="cursor-pointer px-8 py-2 bg-primary  transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden cursor-pointer"
      >
        <span>
          {" "}
          <HiOutlineMenuAlt3 size={30} />{" "}
        </span>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}
      >
        <br />

        <NavLink
          to="/write"
          className="hover:bg-seconday/30   px-5 py-1.5 rounded-2xl flex items-center gap-2 mb-2 w-full "
        >
          <span>
            <FaPencilAlt />
          </span>
          Write
        </NavLink>

        <NavLink
          to="/"
          className="hover:bg-seconday/30  px-5 py-1.5 rounded-2xl flex items-center gap-2 mb-2 w-full"
        >
          <span>
            <MdOutlineViewCozy size={22} />
          </span>
          My Blogs
        </NavLink>
        {/* <NavLink to="/art" className="mb-2">
          Art
        </NavLink>
        <NavLink to="/science" className="mb-2">
          Science
        </NavLink>
        <NavLink to="/technology" className="mb-2">
          Technology
        </NavLink>
        <NavLink to="/cinema" className="mb-2">
          Cinema
        </NavLink>
        <NavLink to="/design" className="mb-2">
          Design
        </NavLink>
        <NavLink to="/food" className="mb-2">
          Food
        </NavLink> */}

        <button className="cursor-pointer px-6 py-2 mt-2 bg-primary  transition text-white rounded-full text-sm w-full">
          Login
        </button>
        <br />
      </div>
    </nav>
  );
};

export default Navbar;
