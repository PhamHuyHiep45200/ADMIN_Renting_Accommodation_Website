import React, { useEffect, useMemo, useState } from "react";
import {
  getAllProduct,
  updateMultiProduct,
  updateStatusProduct,
} from "@/service/product";
import { formatMoney } from "@/utils/common";
import { Button, Image, Pagination, Table } from "antd";
import { useRouter } from "next/router";
import { PRODUCT_STATUS } from "@/enum/product.enum";

function ProductPending({ checkCall, resetData }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const changeStatusProducts = async (status) => {
    try {
      await updateStatusProduct({
        status,
        listId: selectedRowKeys,
      });
      getAllProductPendding();
      resetData();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProductPendding = async () => {
    setLoading(true);
    try {
      const { data } = await getAllProduct({
        status: "PENDING",
      });
      const product = [
        ...data.data.map((e) => ({
          ...e,
          key: e._id,
        })),
      ];
      setData([...product]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProductPendding();
  }, [checkCall]);
  const columns = useMemo(() => {
    return [
      {
        title: "House",
        render: (_, record) => (
          <div className="flex items-center space-x-4">
            <Image
              src={record?.imgs[0]}
              alt=""
              className="max-w-[100px] min-w-[100px] min-h-[100px] max-h-[100px] rounded-[6px]"
            />
            <div className="max-w-[200px]">{record?.title}</div>
            <div>
              <span className="block text-[12px] text-[#999] italic">
                Thể Loại
              </span>
            </div>
          </div>
        ),
      },
      {
        title: "Category",
        render: (_, record) => <span>{record.category.name}</span>,
      },
      {
        title: "type",
        align: "center",
        render: (_, record) => <span>{record.type} đ</span>,
      },
      {
        title: "Money",
        render: (_, record) => (
          <span className="text-[red] font-semibold">
            {formatMoney(record.money)} đ
          </span>
        ),
      },
    ];
  }, [data]);
  return (
    <div>
      <div className="flex justify-end space-x-4 items-center mb-5">
        <Button onClick={() => changeStatusProducts(PRODUCT_STATUS.APPROVED)}>
          Duyệt
        </Button>
        <Button
          dange
          onClick={() => changeStatusProducts(PRODUCT_STATUS.UN_APPROVE)}
          r
        >
          Huỷ Bài
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </div>
  );
}

export default ProductPending;
