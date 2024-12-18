import React from "react";
import { getBlogs } from "../../supabase/blogs";
import { useQuery } from "@tanstack/react-query";

const Blogs: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
  console.log(data)

  return <div>Blogs</div>;
};

export default Blogs;
