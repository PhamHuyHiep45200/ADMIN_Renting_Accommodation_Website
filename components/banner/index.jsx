import { HighlightOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import AddUser from "./addBanner";
import UpdateUser from "./updateBanner";
import { deleteCategory, getAllCategory, unDeleteCategory } from "@/service/category";
import { Image } from "antd";
import { deleteBanner, getAllBanner } from "@/service/banner";

function Banner() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [add, setAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const columns = [
    {
      title: "Ảnh",
      align:'center',
      key: "name",
      render: (e) => (
        <div>
          <Image width={250} height={150} src={process.env.NEXT_PUBLIC_URL_SERVER + e.thumbnail} alt=""/>
        </div>
      ),
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (e) => (
        <div className="flex items-center space-x-[10px]">
          <div
            className="px-[10px] py-[5px] rounded-sm bg-[green] border-[green] border-[1px] bg-opacity-25 space-x-[5px] text-[white] flex items-center cursor-pointer font-medium"
            onClick={() => {
              setDataUpdate(e);
              setOpenUpdate(true);
            }}
          >
            <HighlightOutlined className="text-[green]" />
            <span className="text-[green]">Chỉnh Sửa</span>
          </div>
            <div
              className="px-[10px] py-[5px] rounded-sm bg-[red] border-[red] border-[1px] bg-opacity-25 space-x-[5px] text-[white] flex items-center cursor-pointer font-medium"
              onClick={() => handleDelete(e.id)}
            >
              <LockOutlined className="text-[red]" />
              <span className="text-[red]">Xoá</span>
            </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    setLoading(true);
    try {
      const response = await getAllBanner();
      console.log(response);
      if (response.data && response.data.status === 200) {
        setLoading(false);
        setData(response.data.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const closeAdd = () => {
    setAdd(false);
    setOpenUpdate(false);
  };
  const handleDelete = async(id)=>{
    const response =await deleteBanner(id)
    if(response.data && response.data.status===200){
      getAll()
    }else{
      console.log(response)
    }
  }
  return (
    <div>
      <div className="mb-5">
        <Button size="large" onClick={() => setAdd(true)}>
          Thêm Banner
        </Button>
      </div>
      <AddUser open={add} refresh={getAll} closeAdd={closeAdd} />
      <UpdateUser
        open={openUpdate}
        refresh={getAll}
        closeAdd={closeAdd}
        data={dataUpdate}
      />
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  );
}

export default Banner;