import React, { useEffect, useMemo, useState } from "react";
import { getAllProduct, updateMultiProduct } from "@/service/product";
import { formatMoney } from "@/utils/common";
import { Button, Image, Pagination, Table } from "antd";
import { useRouter } from "next/router";
import { PRODUCT_STATUS } from "@/enum/product.enum";

function ProductCancle({checkCall}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    limit: 10,
  });

  const getAllProductCancle = async () => {
    setLoading(true);
    try {
      const { products } = await getAllProduct({
        status: 2,
        page: pagination.page,
        limit: pagination.limit,
      });
      setData(
        products.data.map((e) => ({
          ...e,
          key: e.id,
        }))
      );
      setPagination({
        ...pagination,
        total: products.total,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProductCancle();
  }, [pagination.page, checkCall]);
  const columns = useMemo(() => {
    return [
      {
        title: "Sản Phẩm",
        render: (_, record) => (
          <div className="flex items-center space-x-4">
            <Image
              src={record.image_master}
              alt=""
              className="max-w-[100px] min-w-[100px] min-h-[100px] max-h-[100px] rounded-[6px]"
            />
            <div className="max-w-[200px]">{record?.name}</div>
            <div>
              <span className="block text-[12px] text-[#999] italic">
                Thể Loại
              </span>
              <span>{record?.category?.name}</span>
            </div>
          </div>
        ),
      },
      {
        title: "Đơn Giá",
        render: (_, record) => <span>{formatMoney(record.price)} đ</span>,
      },
      {
        title: "Số Lượng",
        align: "center",
        dataIndex: "quantity",
      },
      {
        title: "Tổng Tiền",
        render: (_, record) => (
          <span className="text-[red] font-semibold">
            {formatMoney(record.price * record.quantity)} đ
          </span>
        ),
      },
    ];
  }, []);
  const changePaginate = (e) => {
    setPagination({
      ...pagination,
      page: e,
    });
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
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

export default ProductCancle;
