import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Button, Table } from "antd";
import Column from "antd/es/table/Column";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  deleteBlogByIdInAdmin,
  getBlogsInAdmin,
} from "../../../../supabase/blogs-admin";
import { useNavigate } from "react-router-dom";

const BlogsTable: React.FC = () => {
  const navigate = useNavigate();
  //
  const {
    data: blogs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogsInAdmin,
  });

  const { mutate: deleteBlog } = useMutation({
    mutationKey: ["deleteBlog"],
    mutationFn: deleteBlogByIdInAdmin,
    onSuccess: () => {
      refetch();
    },
  });
  //
  const handleAddBlog = () => {
    navigate("createBlog");
  };
  //
  const handleEditBlog = (id: number) => {
    navigate(`editBlog/${id}`);
  };
  //
  const handleDeleteBlog = (id: number) => {
    deleteBlog(id);
  };
  // Base URL for images
  const imageUrl = `${import.meta.env.VITE_SUPABASE_BLOG_IMAGES_STORAGE_URL}`;
  //
  const dataSource = blogs?.map((blog) => ({
    ...blog,
    key: blog.id.toString(),
    image_url: `${imageUrl}/${blog.image_url}`,
  }));
  //
  return (
    <Table
      title={() => (
        <Button type="primary" onClick={handleAddBlog}>
          Add Blog
        </Button>
      )}
      loading={isLoading}
      bordered
      dataSource={dataSource}
    >
      <Column title="Id" dataIndex="id" key="id" />
      <Column
        title="Created At"
        dataIndex="created_at"
        key="created_at"
        render={(text) => dayjs(text).format("YYYY-MM-DD HH:mm")}
      />
      <Column title="Title (KA)" dataIndex="title_ka" key="title_ka" />
      <Column title="Title (EN)" dataIndex="title_en" key="title_en" />
      <Column
        title="Description (KA)"
        dataIndex="description_ka"
        key="description_ka"
      />
      <Column
        title="Description (EN)"
        dataIndex="description_en"
        key="description_en"
      />
      <Column title="User ID" dataIndex="user_id" key="user_id" />
      <Column
        title="Image URL"
        dataIndex="image_url"
        key="image_url"
        render={(text) => (
          <img src={text} alt="Blog" style={{ width: 50, height: 50 }} />
        )}
      />
      <Column
        title="Actions"
        dataIndex="actions"
        key="actions"
        render={(_, row: { id: string }) => (
          <div className="flex justify-center items-center gap-5">
            <EditOutlined
              className="cursor-pointer text-xl text-amber-500"
              onClick={() => {
                handleEditBlog(Number(row.id));
              }}
            />
            <DeleteOutlined
              className="cursor-pointer text-xl text-red-500"
              onClick={() => {
                handleDeleteBlog(Number(row.id));
              }}
            />
          </div>
        )}
      />
    </Table>
  );
};

export default BlogsTable;
