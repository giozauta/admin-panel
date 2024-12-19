import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { createUserInAdmin } from "../../../../supabase/users-list-admin";

const CreateUser: React.FC = () => {
  const [form] = useForm();

  // Use mutation hook to call the API
  const { mutate: createUser } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: (data: { email: string; password: string }) =>
      createUserInAdmin(data),
    onSuccess: () => {
      notification.success({
        message: "User Created",
        description: "The user has been successfully created!",
      });
      form.resetFields();
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    createUser(values);
    console.log("Received values of form: ", values);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-2xl font-bold">
        <h1>Create User</h1>
      </div>
      <Form
        form={form}
        onFinish={handleSubmit}
        name="createUserForm"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Email" name="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUser;
