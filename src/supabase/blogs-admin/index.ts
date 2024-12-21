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

import { v4 as uuidv4 } from "uuid"; // For generating unique file names

export const uploadBlogInAdmin = async (newBlogValues: {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
}, image_file: File) => {
  try {
    // სურათის ტიპის რომ გავფილტროთ 
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(image_file.type)) {
      throw new Error("Invalid file type. Only PNG, JPEG, and JPG are allowed.");
    }

    //ყველას რომ ქონდეს ინდივიდუალური განსხვავებული სახელი 
    const uniqueFileName = `${uuidv4()}-${image_file.name}`;

    const imageResult = await supabase.storage
      .from("blog_images")
      .upload(uniqueFileName, image_file);

    if (imageResult.error) {
      throw new Error(`Error uploading image: ${imageResult.error.message}`);
    }

    const blogsData = {
      ...newBlogValues,
      image_url: imageResult.data?.path,
    };


    const { data, error } = await supabase.from("blogs").insert(blogsData);

    if (error) {
      throw new Error(`Error inserting blog: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error(`Failed to create blog: ${error instanceof Error ? error.message : error}`);
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
