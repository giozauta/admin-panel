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

export const updateUserInAdmin = async (
  id: string,
  payload: { email: string; phone: string },
) => {
  try {
    const result = await supabase.auth.admin.updateUserById(id, { ...payload });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (id: string) => {
  try {
    const result = await supabase.auth.admin.getUserById(id);
    console.log(result.data.user);
    return result.data.user;
  } catch (err) {
    console.log(err);
  }
};

export const createUserInAdmin = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const result = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
