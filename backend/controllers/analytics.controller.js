import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalyticsData = async () => {
  const totalUsers = await User.countDocuments();
  const totalProduct = await Product.countDocuments();

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null, // group all documents together
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };

  return {
    users: totalUsers,
    products: totalProduct,
    totalSales,
    totalRevenue,
  };
};

export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dateArray = getDateInRange(startDate, endDate);
    return dateArray.map((date) => {
      const foundData = dailySalesData.find((item) => item._id === date);

      return {
        date,
        sales: foundData.sales || 0,
        revenue: foundData.revenue || 0,
      };
    });

    //   example of dailySaltData
    // [
    //     {
    // _id: "2025-04-07",
    // sales: 12,
    // revenue: 79.99
    //     }
    //     {
    // _id: "2025-04-08",
    // sales: 8,
    // revenue: 56.99
    //     }
    //     {
    // _id: "2025-04-09",
    // sales: 16,
    // revenue: 100.15
    //     }
    // ]
  } catch (error) {
    throw error;
  }
};

function getDateInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
