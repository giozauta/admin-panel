import supabase from "..";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return supabase.auth
    .signInWithPassword({
      email,
      password,
    })
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }

      return res;
    });
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  console.log(error);
};
