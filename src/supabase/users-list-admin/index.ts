import supabase from "..";
import { user } from "./types";

export const getUsersListsInAdmin = async (): Promise<user[] | undefined> => {
  try {
    const result = await supabase.auth.admin.listUsers();
    return result.data.users as user[];
  } catch (error) {
    console.log(error);
  }
};
