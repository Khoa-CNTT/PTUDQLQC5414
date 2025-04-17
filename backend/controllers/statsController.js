import orderModel from '../models/orderModel.js';
import moment from 'moment';

// API lấy doanh thu theo ngày trong 7 ngày gần nhất
const getRevenueByDay = async (req, res) => {
    try {
        const today = moment().endOf('day'); // Lấy thời điểm cuối ngày hôm nay (23:59:59)
        const last7Days = moment().subtract(6, 'days').startOf('day'); // Lấy ngày bắt đầu cách đây 6 ngày (00:00:00)

        const data = await orderModel.aggregate([
            {
                // Lọc các đơn hàng có ngày nằm trong khoảng từ 6 ngày trước đến hết hôm nay
                $match: {
                    date: {
                        $gte: last7Days.toDate().getTime(),
                        $lte: today.toDate().getTime()
                    }
                }
            },
            {
                // Gom nhóm theo ngày (định dạng YYYY-MM-DD)
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: { $toDate: "$date" } // Chuyển timestamp thành kiểu ngày
                        }
                    },
                    total: { $sum: "$amount" } // Tính tổng tiền từ các đơn hàng mỗi ngày
                }
            },
            { $sort: { _id: 1 } } // Sắp xếp theo ngày tăng dần
        ]);

        res.json(data); // Trả về kết quả cho client
    } catch (err) {
        res.status(500).json({ error: err.message }); // Trả lỗi nếu có
    }
};

// API lấy doanh thu theo tuần (4 tuần gần nhất)
const getRevenueByWeek = async (req, res) => {
    try {
        const fourWeeksAgo = moment().subtract(3, 'weeks').startOf('isoWeek'); // Lấy đầu tuần của tuần cách đây 3 tuần

        const data = await orderModel.aggregate([
            {
                // Lọc các đơn hàng từ thời điểm đó trở về sau
                $match: {
                    date: { $gte: fourWeeksAgo.toDate().getTime() }
                }
            },
            {
                // Gom nhóm theo tuần ISO
                $group: {
                    _id: {
                        $isoWeek: { $toDate: "$date" } // Lấy số tuần trong năm theo chuẩn ISO
                    },
                    total: { $sum: "$amount" } // Tính tổng tiền mỗi tuần
                }
            },
            {
                // Đổi tên _id thành "week" và loại bỏ _id khỏi kết quả
                $project: {
                    week: "$_id",
                    total: 1,
                    _id: 0
                }
            },
            { $sort: { week: 1 } } // Sắp xếp theo tuần tăng dần
        ]);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// API lấy doanh thu theo tháng trong năm hiện tại
const getRevenueByMonth = async (req, res) => {
    try {
        const thisYear = moment().startOf('year'); // Lấy ngày đầu năm (1/1)

        const data = await orderModel.aggregate([
            {
                // Lọc các đơn hàng từ đầu năm đến nay
                $match: {
                    date: { $gte: thisYear.toDate().getTime() }
                }
            },
            {
                // Gom nhóm theo tháng
                $group: {
                    _id: { $month: { $toDate: "$date" } }, // Lấy số tháng (1 - 12)
                    total: { $sum: "$amount" } // Tổng tiền từng tháng
                }
            },
            {
                // Đổi tên _id thành "month" và loại bỏ _id
                $project: {
                    month: "$_id",
                    total: 1,
                    _id: 0
                }
            },
            { $sort: { month: 1 } } // Sắp xếp theo tháng tăng dần
        ]);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { getRevenueByDay, getRevenueByWeek, getRevenueByMonth };
