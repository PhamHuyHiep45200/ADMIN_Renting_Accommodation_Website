import { createCategory } from "@/service/category";
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import UploadFile from "../common/UploadFile";
import { createBanner } from "@/service/banner";

function AddBanner({ open, refresh, closeAdd }) {
  const [form] = Form.useForm();
  const submit = async (e) => {
    const response = await createBanner(e);
    if (response.data && response.data.status === 200) {
      refresh();
      onCloseAdd();
    } else {
      console.log(response);
    }
  };
  const onCloseAdd = () => {
    closeAdd();
    form.resetFields();
  };
  return (
    <Modal title="Tạo Banner" open={open} onCancel={onCloseAdd} footer={false}>
      <Form onFinish={submit} layout="vertical" form={form}>
        <Form.Item
          label="Ảnh"
          name="thumbnail"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <UploadFile type="picture-card"/>
        </Form.Item>
        <Form.Item
          label="Link"
          name="link"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
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

export default AddBanner;
