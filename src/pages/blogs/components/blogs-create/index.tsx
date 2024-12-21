import React from "react";
import { Form, Input, Button, notification, Upload } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { uploadBlogInAdmin } from "../../../../supabase/blogs-admin";
import { UploadOutlined } from "@ant-design/icons";

type blog = {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
};


type FormValues = blog & {
  upload: UploadFile[];
};


type UploadFile = {
  uid: string;
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
  webkitRelativePath: string;
  originFileObj: File; 
};

const CreateBlogForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Mutation for creating a blog
  const { mutate: createBlogData } = useMutation({
    mutationKey: ["createBlog"],
    mutationFn: ({ data, image_file }: { data: blog, image_file: File }) =>
      uploadBlogInAdmin(data, image_file),
    onSuccess: () => {
      form.resetFields();
      notification.success({
        message: "Success",
        description: "Blog created successfully!",
      });
      navigate("/dashboard/blogs");
    },
  });

  // Handle form submission
  const handleSubmit = async (values: FormValues) => {
    const image_file = values.upload[0]?.originFileObj; 
    if (!image_file) {
      return; 
    }


    createBlogData({
      data: {
        title_ka: values.title_ka,
        title_en: values.title_en,
        description_ka: values.description_ka,
        description_en: values.description_en,
      },
      image_file: image_file,
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

        <Form.Item
          name="upload"
          label="Upload Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
          rules={[{ required: true, message: "Please upload a file!" }]}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
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
