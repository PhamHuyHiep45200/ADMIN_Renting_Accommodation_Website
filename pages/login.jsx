import LayoutLogin from "@/components/layouts/LayoutLogin";
import { CreateContext } from "@/context/ContextProviderGlobal";
import { loginUser } from "@/service/auth";
import { Button, Form, Input } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

function Login() {
  const { errorNoti, userAuth, user } = useContext(CreateContext);
  const router = useRouter();
  const submit = async (e) => {
    try {
      const { data } = await loginUser(e);
      localStorage.setItem("token_admin", data.accessToken);
      localStorage.setItem("refresh_token_admin", data.refreshToken);
      localStorage.setItem(
        "expires",
        moment().add(data.expiresTime, "seconds")
      );
      userAuth(true);
    } catch (error) {
      errorNoti("Đã có lỗi xảy ra");
    }
  };
  useEffect(() => {
    console.log(user)
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div>
      <div className="my-5 font-[500] text-center text-[30px]">Login</div>
      <Form onFinish={submit} layout="vertical">
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" placeholder="Phone" className="round-[15px]" />
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
      </Form>
    </div>
  );
}

export default Login;

Login.getLayout = function getLayout(page) {
  return <LayoutLogin>{page}</LayoutLogin>;
};
