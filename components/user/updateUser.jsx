import { updateUser } from "@/service/user";
import { Button, Form, Input, Modal, Select } from "antd";
// import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
const { TextArea } = Input;

function UpdateUser({ open, refresh, closeAdd, data }) {
  const [form] = Form.useForm();
  const submit = async (e) => {
    try {
      await updateUser(data._id, e);
      refresh();
      onCloseAdd();
    } catch (error) {
      console.log(error);
    }
  };
  const onCloseAdd = () => {
    closeAdd();
    form.resetFields();
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        username: data.username,
        phone: data.phone,
        address: data.address,
        role: data.role,
      });
    }
  }, [data]);
  return (
    <Modal
      title="Update User"
      open={open}
      onCancel={onCloseAdd}
      footer={false}
    >
      <Form onFinish={submit} layout="vertical" form={form}>
        <Form.Item
          label="UserName"
          name="username"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Không được bỏ trống!" },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Select
            size="large"
            options={[
              { value: "client", label: "USER" },
              { value: "admin", label: "ADMIN" },
            ]}
          />
        </Form.Item>
        <div>
          <Button htmlType="submit" className="w-full" size="large">
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateUser;
