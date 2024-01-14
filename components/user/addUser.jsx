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
    <Modal title="Tạo Người Dùng" open={open} onCancel={onCloseAdd} footer={false}>
      <Form onFinish={submit} layout="vertical" form={form}>
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Không được bỏ trống!" },
            { type: "email", message: "Phải là email" },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
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