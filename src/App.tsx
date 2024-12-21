import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/auth";
import DashboardLayout from "./layout/dashboard";
import AuthGuard from "./components/auth-guard";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { userAtom } from "./jotai-store/auth";
import supabase from "./supabase";
import UsersView from "./pages/users/views/users-table";
import EditUserView from "./pages/users/views/users-edit";
import CreateUserView from "./pages/users/views/users-create";
import BlogsTableView from "./pages/blogs/views/blogs-table";
import EditBlogFormView from "./pages/blogs/views/blogs-edit";
import BlogsCreateView from "./pages/blogs/views/blogs-create";

function App() {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session);
        localStorage.setItem("userSession", JSON.stringify(session));
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
      if (session) {
        localStorage.setItem("userSession", JSON.stringify(session));
      } else {
        localStorage.removeItem("userSession");
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="auth" />} />
      <Route path="auth" element={<AuthLayout />} />
      <Route
        path="dashboard"
        element={
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }
      >
        <Route path="blogs" element={<BlogsTableView />} />
        <Route path="users" element={<UsersView />} />
        <Route path="users/editUser/:id" element={<EditUserView />} />
        <Route path="users/createUser" element={<CreateUserView />} />

        <Route path="blogs/editBlog/:id" element={<EditBlogFormView />} />
        <Route path="blogs/createBlog" element={<BlogsCreateView />} />
      </Route>

      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
