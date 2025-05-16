import orderModel from '../models/orderModel.js';
import productModel from '../models/productModel.js';
import { SLR } from 'ml-regression';

const forecastBestSeller = async (req, res) => {
    try {
        const now = Date.now();
        const startDate = now - 1000 * 60 * 60 * 24 * 14; // 2 tuần trước

        // Lấy orders trong khoảng 2 tuần gần nhất
        const orders = await orderModel.find({
            date: { $gte: startDate, $lte: now }
        });

        console.log(`Số đơn trong 2 tuần: ${orders.length}`);

        const productSales = {};

        orders.forEach(order => {
            const orderWeek = Math.floor((order.date - startDate) / (1000 * 60 * 60 * 24 * 7));
            order.items.forEach(item => {
                const productId = item.productId?.toString() || item._id?.toString();
                if (!productId) {
                    console.warn('Có item không có productId:', item);
                    return;
                }
                if (!productSales[productId]) productSales[productId] = [];
                productSales[productId].push({ week: orderWeek, quantity: item.quantity });
            });
        });

        console.log('Dữ liệu productSales:', productSales);

        const productIds = Object.keys(productSales);
        if (productIds.length === 0) {
            return res.status(200).json({ success: true, data: [], message: 'Không có dữ liệu sản phẩm trong 2 tuần' });
        }

        const products = await productModel.find({ _id: { $in: productIds } }).select('name');
        const productMap = {};
        products.forEach(p => {
            productMap[p._id.toString()] = p.name;
        });

        const forecasts = [];

        for (const productId of productIds) {
            const sales = productSales[productId];
            const weekTotals = {};
            sales.forEach(({ week, quantity }) => {
                if (!weekTotals[week]) weekTotals[week] = 0;
                weekTotals[week] += quantity;
            });

            const weeks = Object.keys(weekTotals).map(Number).sort((a, b) => a - b);

            const X = weeks;
            const Y = weeks.map(w => weekTotals[w]);

            let predictedQuantity = 0;

            if (weeks.length === 1) {
                predictedQuantity = Y[0]; // Nếu chỉ có 1 tuần dữ liệu, lấy luôn
            } else if (weeks.length > 1) {
                const regression = new SLR(X, Y);
                const nextWeek = Math.max(...X) + 1;
                predictedQuantity = regression.predict(nextWeek);
            } else {
                continue;
            }

            forecasts.push({
                productId,
                productName: productMap[productId] || 'Unknown Product',
                predictedQuantity: Math.max(0, Math.round(predictedQuantity))
            });
        }

        forecasts.sort((a, b) => b.predictedQuantity - a.predictedQuantity);

        return res.status(200).json({
            success: true,
            data: forecasts.slice(0, 3) // Top 3 sản phẩm dự báo
        });

    } catch (error) {
        console.error(' Lỗi dự báo:', error);
        return res.status(500).json({ success: false, message: 'Lỗi server khi dự báo.' });
    }
};

export { forecastBestSeller };
