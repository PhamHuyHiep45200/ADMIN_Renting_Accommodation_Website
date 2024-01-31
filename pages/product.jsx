import ProductApprove from "@/components/post/ProductPending";
import ProductApproved from "@/components/post/ProductApproved";
import ProductCancle from "@/components/post/ProductCancle";
import { Tabs, Tag } from "antd";
import React, { useState } from "react";

function Product() {
  const [checkCall, setCheckCall] = useState(Math.random())

  const resetData = ()=>{
    setCheckCall(Math.random())
  }
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: <Tag color="green">Accept Post</Tag>,
      children: <ProductApproved checkCall={checkCall} resetData={resetData} />,
    },
    {
      key: "2",
      label: <Tag color="blue">Pendding Post</Tag>,
      children: <ProductApprove checkCall={checkCall} resetData={resetData} />,
    },
    {
      key: "3",
      label: <Tag color="red">Reject Post</Tag>,
      children: <ProductCancle checkCall={checkCall} />,
    },
  ];
  return (
    <div>
      <div className="text-center text-[30px] font-bold text-[#333]">
        Quản Lý Sản Phẩm
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default Product;
