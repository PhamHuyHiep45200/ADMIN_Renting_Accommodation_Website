import LayoutLogin from "@/components/layouts/LayoutLogin";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { loginUser } from "@/service/auth";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

function Login() {
  const { errorNoti, userAuth, user } = useContext(CreateContext);
  const router = useRouter();
  const redirectRegister = (path) => {
    router.push("/register");
  };
  const submit = async (e) => {
    try {
      const {data} = await loginUser(e);
      localStorage.setItem('token_admin', data.token)
      userAuth(true)
    } catch (error) {
      errorNoti('Đã có lỗi xảy ra');
    }
  };
  useEffect(()=>{
    if (user) {
      router.push("/");
    }
  },[user])
  return (
    <div>
      <div className="my-5 font-[500] text-center text-[30px]">Login</div>
      <Form onFinish={submit}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Không được bỏ trống!" },
            { type: "email", message: "Bắt buộc email" },
          ]}
        >
          <Input size="large" placeholder="Email" className="round-[15px]" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input.Password size="large" placeholder="Mật khẩu" />
        </Form.Item>
        <Button
          className="w-full !bg-primary !my-2 !font-medium !text-[white] !rounded-[20px]"
          size="large"
          htmlType="submit"
        >
          Đăng Nhập
        </Button>
        <span
          className="block text-right text-primary underline underline-offset-1 cursor-pointer font-medium"
          onClick={redirectRegister}
        >
          Đăng kí tài khoản
        </span>
      </Form>
    </div>
  );
}

export default Login;

Login.getLayout = function getLayout(page) {
  return <LayoutLogin>{page}</LayoutLogin>;
};