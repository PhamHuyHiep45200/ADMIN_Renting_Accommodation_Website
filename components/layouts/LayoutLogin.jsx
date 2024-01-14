import { CreateContext } from "@/context/ContextProviderGlobal";
import {
    GooglePlusOutlined,
    InstagramOutlined,
    TwitterOutlined,
  } from "@ant-design/icons";
  import { Image } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
  
  /* eslint-disable @next/next/no-img-element */
  export default function LayoutLogin({
    children, // will be a page or nested layout
  }) {
    const { user } = useContext(CreateContext);
    const router = useRouter()
    useEffect(()=>{
      if(user) {
        router.push('/')
      }
    }, [user])
    return (
      <div>
        <div
          className="fixed top-0 right-0 bottom-0 left-0 w-full h-full z-[10] flex items-center justify-center"
        >
          <div className="max-w-[450px] min-w-[320px] p-[30px] rounded-[4px] pb-[100px] bg-white">
            <div>
              <Image src="/image/logo.png" alt="" preview={false} />
            </div>
            {children}
          <div className="flex mt-3 justify-center space-x-4 items-center">
            <GooglePlusOutlined className="text-[30px] text-primary" />
            <InstagramOutlined className="text-[30px] text-primary" />
            <TwitterOutlined className="text-[30px] text-primary" />
          </div>
          </div>
        </div>
      </div>
    );
  }
  