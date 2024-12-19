import { Blog, UpdateBlogValue } from "./types";
import supabase from "..";

export const getBlogsInAdmin = async (): Promise<Blog[]> => {
  try {
    const { data, error } = await supabase.from("blogs").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error(`Failed to fetch blogs: ${error}`);
  }
};

export const uploadBlogInAdmin = async (newBlogValues: {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
}) => {
  try {
    const { data, error } = await supabase.from("blogs").insert(newBlogValues);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const getBlogById = async (id: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateBlogById = async (
  id: string,
  updatedValues: UpdateBlogValue,
) => {
  const { data, error } = await supabase
    .from("blogs")
    .update(updatedValues)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteBlogByIdInAdmin = async (id: number) => {
  try {
    const response = await supabase.from("blogs").delete().eq("id", id);
    return response;
  } catch (error) {
    return error;
  }
};
