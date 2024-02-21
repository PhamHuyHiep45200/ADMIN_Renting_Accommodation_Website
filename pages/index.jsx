import { Col, Divider, Row, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { statistic } from "@/service/statistic";
import { OrderedListOutlined, UserOutlined } from "@ant-design/icons";
import CountUp from 'react-countup';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {value}
    </text>
  );
};
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState();
  const [orderFilter, setOrderFilter] = useState();
  const [houseLocation, setHouseLocation] = useState();
  const [category, setCategory] = useState(0);
  const [user, setUser] = useState(0);

  useEffect(() => {
    getStatistics();
  }, []);

  const getStatistics = async () => {
    try {
      const { data } = await statistic();
      setUser(data?.userCount);
      setCategory(data?.categoryCount);
      const dataFormat = [
        {
          name: "Nhà trọ phê duyệt",
          value: data?.houseAccept,
        },
        {
          name: "Nhà trọ đợi duyệt",
          value: data?.housePending,
        },
        {
          name: "Nhà trọ bị huỷ",
          value: data?.houseReject,
        },
      ];
      const dataHouse = [
        {
          name: "Nhà trọ đang cho thuê",
          quantity: data?.houseTrue,
        },
        {
          name: "Nhà trọ tắt cho thuê",
          quantity: data?.houseFalse,
        },
        {
          name: "Thuê trọ",
          quantity: data?.houseRent,
        },
        {
          name: "Tìm người ở ghép",
          quantity: data?.housePair,
        },
      ];
      const dataHouseLocation = [
        {
          name: "Hà Nội",
          quantity: data?.houseHN,
        },
        {
          name: "Đà Nẵng",
          quantity: data?.houseDN,
        },
        {
          name: "Hồ Chí Minh",
          quantity: data?.houseHCM,
        },
      ];
      setOrder(dataFormat);
      setOrderFilter(dataHouse);
      setHouseLocation(dataHouseLocation);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[30px] font-bold">THỐNG KÊ ADMIN</h1>
      {!loading && (
        <>
          <Divider />
          <div className="flex items-center space-x-10 self-start">
            <Statistic
              title="Người Dùng"
              value={user}
              formatter={(value)=><CountUp end={value} duration={2} />}
              prefix={<UserOutlined />}
            />
            <Statistic
              title="Thể Loại"
              value={category}
              formatter={(value)=><CountUp end={value} duration={2} />}
              prefix={<OrderedListOutlined />}
            />
          </div>
          <Divider />
          <Row className="flex items-end justify-around w-full">
            <Col className="flex flex-col justify-start" span={12}>
              <div className="text-center font-bold text-[22px] mb-5">
                Thống kê đăng nhà trọ{" "}
              </div>
              <div className="flex items-center">
                <PieChart width={400} height={400}>
                  <Pie
                    data={order}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
                <div>
                  {order &&
                    order?.length &&
                    order.map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="flex items-center space-x-2 mb-3"
                        >
                          <div
                            className="w-[30px] h-[30px] flex justify-center items-center"
                            style={{ background: COLORS[i] }}
                          ></div>
                          <span>{e.name}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="text-center font-bold text-[22px] mb-20">
                Thống kê khu vực nhà trọ{" "}
              </div>
              <BarChart width={500} height={350} data={houseLocation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#FF8042" />
              </BarChart>
            </Col>
          </Row>
          <Divider />
          <div className="font-bold text-[22px] mb-5">Thống kê về nhà trọ</div>
          <BarChart width={1000} height={350} data={orderFilter}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
          <Divider />
        </>
      )}
    </div>
  );
}
