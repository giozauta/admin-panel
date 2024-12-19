import React, { useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getBlogById, updateBlogById } from "../../../../supabase/blogs-admin";

type BlogType = {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
};

const EditBlogForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();

  // Fetch the blog data
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id!),
    enabled: !!id, // Ensure the query only runs if `id` exists
  });

  // Update the blog data
  const { mutate: updateBlog } = useMutation({
    mutationKey: ["updateBlog"],
    mutationFn: (updatedValues: BlogType) => updateBlogById(id!, updatedValues),
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Blog updated successfully!",
      });
      navigate("/dashboard/blogs");
    },
  });

  useEffect(() => {
    if (blog) {
      form.setFieldsValue(blog); // Set the fetched data to the form
    }
  }, [blog, form]);

  const handleSubmit = async (values: BlogType) => {
    updateBlog(values);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog data</div>;

  return (
    <div className="edit-blog-form flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Edit Blog</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          title_ka: "",
          title_en: "",
          description_ka: "",
          description_en: "",
        }}
      >
        <Form.Item
          label="Title (KA)"
          name="title_ka"
          rules={[
            { required: true, message: "Please input the title in Georgian!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Title (EN)"
          name="title_en"
          rules={[
            { required: true, message: "Please input the title in English!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description (KA)"
          name="description_ka"
          rules={[
            {
              required: true,
              message: "Please input the description in Georgian!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Description (EN)"
          name="description_en"
          rules={[
            {
              required: true,
              message: "Please input the description in English!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Blog
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditBlogForm;
