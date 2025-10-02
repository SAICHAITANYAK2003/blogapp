import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Footer from "./components/Footer";
import CardDetails from "./components/CardDetails";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Write from "./pages/Write";
import Blogs from "./pages/Blogs";
import Edit from "./pages/Edit";

const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen md:px-24">
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/blog/:id" element={<CardDetails />} />
          <Route path="/write" element={<Write />} />
          <Route path="/my-blogs" element={<Blogs />} />
          <Route path="/edit/blog/:id" element={<Edit />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export default App;
