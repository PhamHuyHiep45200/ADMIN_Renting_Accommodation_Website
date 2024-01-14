import {
  HighlightOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import AddUser from "./addCategory";
import UpdateUser from "./updateCategory";
import { deleteCategory, getAllCategory } from "@/service/category";
import { Image } from "antd";

function Category() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [add, setAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    limit: 10,
  });
  const columns = [
    {
      title: "Logo",
      align: "center",
      key: "name",
      render: (e) => (
        <div>
          <Image
            width={60}
            height={40}
            src={e?.image}
            alt=""
          />
        </div>
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
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
  }, [pagination.page]);
  const getAll = async () => {
    setLoading(true);
    try {
      const { categories } = await getAllCategory({
        page: pagination.page,
        limit: pagination.limit,
      });
      setData(categories.data);
      setPagination({
        ...pagination,
        total: categories.total,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const closeAdd = () => {
    setAdd(false);
    setOpenUpdate(false);
  };
  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      getAll();
    } catch (error) {
      console.log(error);
    }
  };
  const changePaginate = (e) => {
    setPagination({
      ...pagination,
      page: e,
    });
  };
  return (
    <div>
    <div className="text-center text-[30px] font-bold text-[#333]">Quản Lý Thể Loại</div>
      <div className="mb-5">
        <Button size="large" onClick={() => setAdd(true)}>
          Thêm thể loại
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
      <div className="text-center mt-5">
        <Pagination
          current={pagination.page}
          total={pagination.total}
          pageSize={pagination.limit}
          onChange={(e) => changePaginate(e)}
        ></Pagination>
      </div>
    </div>
  );
}

export default Category;
