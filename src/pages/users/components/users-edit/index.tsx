import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useParams } from "react-router-dom";
import {
  getUserById,
  updateUserInAdmin,
} from "../../../../supabase/users-list-admin";
import SkeletonForUserEdit from "./components";

const EditUser: React.FC = () => {
  //
  const params = useParams<{ id: string }>();
  const userId = params?.id;
  //
  const [form] = useForm();
  //
  const { data: user, isLoading } = useQuery({
    queryKey: ["getUserById"],
    queryFn: () => getUserById(userId as string),
    enabled: !!userId,
  });
  const initialValues = {
    email: user?.email,
    phone: user?.phone,
  };
  //
  const { mutate: updateUser } = useMutation({
    mutationKey: ["updateUserInAdmin"],
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { email: string; phone: string };
    }) => updateUserInAdmin(id, payload),
  });
  //
  const handleSubmit = (formValues: { email: string; phone: string }) => {
    if (userId) {
      updateUser({ id: userId, payload: formValues });
    } else {
      console.error("User ID is missing.");
    }
  };
  //
  if (isLoading) {
    return <SkeletonForUserEdit />;
  }
  //
  return (
    <div className="flex flex-col gap-8">
      <div className="text-2xl font-bold">
        <h1>Edit User</h1>
      </div>

      <Form
        initialValues={initialValues}
        form={form}
        onFinish={handleSubmit}
        name="wrap"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
