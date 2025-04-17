import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ChartBox = ({ title, dataKey, data }) => {
    // Nếu không có dữ liệu or dữ liệu rỗng, hiển thị thông báo "K có dữ liệu"
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-4 rounded-xl shadow w-full md:w-[32%]">
                <h3 className="font-semibold mb-2">{title}</h3>
                <p>No data</p>
            </div>
        );
    }

    // Nếu có dữ liệu, hiển thị biểu đồ cột (BarChart)
    return (
        <div className="bg-white p-4 rounded-xl shadow w-full md:w-[32%]">
            {/* Tiêu đề biểu đồ */}
            <h3 className="font-semibold mb-2">{title}</h3>

            {/* Biểu đồ hiển thị linh hoạt theo kích thước container */}
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    {/* Lưới ngang giúp dễ quan sát */}
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* Trục X dựa theo trường dataKey (ví dụ: _id, week, month) */}
                    <XAxis dataKey={dataKey} />

                    {/* Trục Y hiển thị giá trị doanh thu */}
                    <YAxis />

                    {/* Tooltip hiển thị giá trị khi di chuột qua */}
                    <Tooltip />

                    {/* Cột thể hiện tổng doanh thu, màu xanh dương */}
                    <Bar dataKey="total" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartBox;
