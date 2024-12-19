import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUsersListsInAdmin } from "../../../../supabase/users-list-admin";
import { Button, Table } from "antd";
import Column from "antd/es/table/Column";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";

const Users: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersListsInAdmin,
  });

  const navigate = useNavigate();

  const handleNavigateToUserEdit = (id: string) => {
    navigate(`editUser/${id}`);
  };

  const handleNavigateToCreateUser = () => {
    navigate("createUser"); // Adjust the route as per your app's structure
  };

  const user = data?.map((user) => ({
    ...user,
    key: user.id,
    created_at: user.created_at
      ? dayjs(user.created_at).format("YYYY-MM-DD HH:mm")
      : null,
    email_confirmed_at: user.email_confirmed_at
      ? dayjs(user.email_confirmed_at).format("YYYY-MM-DD HH:mm")
      : null,
    last_sign_in_at: user.last_sign_in_at
      ? dayjs(user.last_sign_in_at).format("YYYY-MM-DD HH:mm")
      : null,
  }));

  return (
    <Table
      title={() => (
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={handleNavigateToCreateUser}
        >
          Create User
        </Button>
      )}
      loading={!user}
      bordered
      dataSource={user}
    >
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="Phone" dataIndex="phone" key="phone" />
      <Column
        title="Last Sign In At"
        dataIndex="last_sign_in_at"
        key="last_sign_in_at"
      />
      <Column
        title="Email Confirmed At"
        dataIndex="email_confirmed_at"
        key="email_confirmed_at"
      />
      <Column title="Created At" dataIndex="created_at" key="created_at" />
      <Column
        title="Actions"
        dataIndex="actions"
        key="actions"
        render={(_, row: { id: string }) => (
          <div className="flex justify-center items-center gap-5">
            <EditOutlined
              className="cursor-pointer text-xl text-amber-500"
              onClick={() => handleNavigateToUserEdit(row.id)}
            />
          </div>
        )}
      />
    </Table>
  );
};

export default Users;
