import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { uploadBlogInAdmin } from "../../../../supabase/blogs-admin";

type blog = {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
};

const CreateBlogForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { mutate: createBlogData } = useMutation({
    mutationKey: ["createBlog"],
    mutationFn: (data: blog) => uploadBlogInAdmin(data),
    onSuccess: () => {
      form.resetFields();
      notification.success({
        message: "Success",
        description: "Blog created successfully!",
      });
      navigate("/dashboard/blogs");
    },
  });

  const handleSubmit = async (values: {
    title_ka: string;
    title_en: string;
    description_ka: string;
    description_en: string;
  }) => {
    createBlogData({
      title_ka: values.title_ka,
      title_en: values.title_en,
      description_ka: values.description_ka,
      description_en: values.description_en,
    });
  };

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-8">
      <h2 className="text-2xl font-bold">Create Blog</h2>
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
            { max: 255, message: "Title cannot exceed 255 characters!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Title (EN)"
          name="title_en"
          rules={[
            { required: true, message: "Please input the title in English!" },
            { max: 255, message: "Title cannot exceed 255 characters!" },
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
            Create Blog
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBlogForm;
