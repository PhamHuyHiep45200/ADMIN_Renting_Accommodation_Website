import { Button, Drawer, Image, Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { cancelOrder, getAllOrder, updateOrder } from "@/service/order";
import moment from "moment/moment";
import { Tag } from "antd";
import {
  KIND_PAYPAL,
  STATUS_CANCEL,
  STATUS_ORDERED,
  StatusOrder,
  StatusTextOrder,
} from "@/enum/order.enum";
import { formatMoney } from "@/utils/common";

function Order() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailPopup, setDetailPopup] = useState(false);

  const columns = useMemo(() => {
    return [
      {
        title: "Trạng thái",
        align: "center",
        key: "name",
        render: (e) => (
          <Tag
            color={StatusOrder[e.status ?? STATUS_ORDERED]}
            className="font-bold"
          >
            {StatusTextOrder[e.status ?? STATUS_ORDERED]}
          </Tag>
        ),
      },
      {
        title: "Người Mua",
        dataIndex: ["user", "name"],
        key: "name",
      },
      {
        title: "Phương Thức Thanh Toán",
        key: "paymentMethod",
        render: (e) => (
          <Tag color={e.kind_of_payment === KIND_PAYPAL ? "cyan" : "blue"}>
            {e.kind_of_payment === KIND_PAYPAL
              ? "Thanh Toán Online"
              : "Thanh Toán Khi Nhận Hàng"}
          </Tag>
        ),
      },
      {
        title: "Số Tiền",
        key: "tags",
        render: (e) => (
          <div className="text-[red] font-bold">
            {formatMoney(e.total_price)}đ
          </div>
        ),
      },
      {
        title: "Thời Gian Mua Hàng",
        key: "tags",
        render: (e) => (
          <div>{moment(e.createdAt).format("HH:mm:ss DD-MM-YYYY")}</div>
        ),
      },
      {
        title: "Thao tác",
        key: "action",
        render: (e) => (
          <div className="flex space-x-2">
            <Button
              onClick={() => {
                setDetailPopup(true);
                setDetail(e);
              }}
            >
              Xem Chi Tiết
            </Button>
            {e.status === STATUS_ORDERED && <Button danger onClick={() => handleCancle(e.id)}>
              Huỷ
            </Button>}
          </div>
        ),
      },
    ];
  }, [data]);

  const columnsProduct = useMemo(() => {
    return [
      {
        title: "Sản Phẩm",
        dataIndex: "name",
        key: "name",
        align: "center",
        render: (_, record) => (
          <div className="flex items-center space-x-4">
            <Image
              className="min-w-[60px] min-h-[40px] max-w-[60px] max-h-[40px] md:min-w-[80px] md:min-h-[80px] md:max-w-[80px] md:max-h-[80px]"
              src={JSON.parse(record?.product?.image)?.[0] ?? ""}
              alt=""
            />
            <span className="truncate-2">{record?.product?.name}</span>
          </div>
        ),
      },
      {
        title: "Số Lượng",
        dataIndex: "age",
        align: "center",
        render: (_, record) => (
          <span className="font-semibold">{record?.quantity}</span>
        ),
      },
      {
        title: "Giá",
        dataIndex: "address",
        align: "center",
        render: (_, record) => (
          <span className="font-semibold text-[12px] md:text-[14px] whitespace-nowrap">
            {formatMoney(record?.product?.price ?? 0)} đ
          </span>
        ),
      },
    ];
  }, [detail]);
  useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    setLoading(true);
    try {
      const { order } = await getAllOrder();
      setLoading(false);
      setData(order.data);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleCancle = async (id) => {
    try {
      await cancelOrder(id);
      getAll();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="text-center text-[30px] font-bold text-[#333]">
        Đơn Hàng
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
      <Drawer
        title="Chi tiết order"
        width={600}
        placement="right"
        onClose={() => setDetailPopup(false)}
        open={detailPopup}
      >
        <span className="font-bold text-[18px] text-[red]">
          Thông tin người mua
        </span>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">Tên: </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {detail?.user?.name}
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">Email: </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {detail?.user?.email}
          </span>
        </div>
        <span className="font-bold text-[18px] text-[red]">
          Thông tin sản phẩm
        </span>
        <div className="w-full">
          <Table
            columns={columnsProduct}
            dataSource={detail?.order_details}
            pagination={false}
          />
        </div>
        <span className="font-bold text-[18px] text-[red]">Chi tiết order</span>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Thời gian Order:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {moment(detail?.createdAt).format("HH:mm:ss DD-MM-YYYY")}
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Phương Thức Thanh Toán:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            <Tag
              color={detail?.kind_of_payment === KIND_PAYPAL ? "cyan" : "blue"}
            >
              {detail?.kind_of_payment === KIND_PAYPAL
                ? "Thanh Toán Online"
                : "Thanh Toán Khi Nhận Hàng"}
            </Tag>
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Trạng Thái Đơn Hàng:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            <Tag
              color={StatusOrder[detail?.status ?? STATUS_ORDERED]}
              className="font-bold"
            >
              {StatusTextOrder[detail?.status ?? STATUS_ORDERED]}
            </Tag>
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Tổng Tiền:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {formatMoney(detail?.total_price)}đ
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Số Điện Thoại:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {detail?.phone}
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Địa Chỉ Nhận Hàng:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {detail?.address}
          </span>
        </div>
      </Drawer>
    </div>
  );
}

export default Order;
