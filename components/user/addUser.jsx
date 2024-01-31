import { createUser } from "@/service/user";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
const { TextArea } = Input;

function AddUser({ open, refresh, closeAdd }) {
  const [form] = Form.useForm();
  const submit = async (e) => {
    try {
      await createUser(e);
      refresh()
      onCloseAdd()
    } catch (error) {
      console.log(error)
    }
  };
  const onCloseAdd = () => {
    closeAdd();
    form.resetFields();
  };
  return (
    <Modal title="Add User" open={open} onCancel={onCloseAdd} footer={false}>
      <Form onFinish={submit} layout="vertical" form={form}>
        <Form.Item
          label="User Name"
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
          label="Pass"
          name="password"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Quyền"
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
            Tạo
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddUser;