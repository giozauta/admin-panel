import { Form, Skeleton, Space } from "antd";

const SkeletonForUserEdit = () => {
  return (
    <Form>
      <Space direction="vertical" size="large">
        <Skeleton.Input active />
        <Skeleton.Input active />
        <Skeleton.Button active />
      </Space>
    </Form>
  );
};

export default SkeletonForUserEdit;
