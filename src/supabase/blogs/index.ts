import supabase from "..";

export const getBlogs = async () => {
  try {
    const result = await supabase.from("blogs").select("*");

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
