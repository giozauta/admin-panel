import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUsersListsInAdmin } from "../../../../supabase/users-list-admin";
import { Table } from "antd";
import Column from "antd/es/table/Column";
import dayjs from "dayjs";

const Users: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersListsInAdmin,
  });

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
    <Table loading={!user} bordered dataSource={user}>
      <Column title="ID" dataIndex="id" key="id" />
      <Column title="Email" dataIndex="email" key="email" />
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
      <Column title="Buttons" dataIndex="buttons" key="buttons" />
    </Table>
  );
};

export default Users;
