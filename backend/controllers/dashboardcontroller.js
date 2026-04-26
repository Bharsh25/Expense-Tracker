import Expense from "../models/expense.js";
import mongoose from "mongoose";

export const getDashboard = async (req, res) => {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);

        // 🔹 1. TOTAL INCOME & EXPENSE
        const totals = await Expense.aggregate([
            {
                $match: {
                    userId,
                    date: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: "$type",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        let totalIncome = 0;
        let totalExpense = 0;

        totals.forEach(item => {
            if (item._id === "income") totalIncome = item.total;
            if (item._id === "expense") totalExpense = item.total;
        });

        const balance = totalIncome - totalExpense;

        // 🔹 2. CATEGORY BREAKDOWN (only expenses)
        const categoryBreakdown = await Expense.aggregate([
            {
                $match: {
                    userId,
                    type: "expense",
                    date: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            },
            { $sort: { total: -1 } }
        ]);

        // 🔹 3. RECENT TRANSACTIONS
        const recentTransactions = await Expense.find({
            userId,
            date: { $gte: start, $lte: end }
        })
            .sort({ date: -1 })
            .limit(5);

        res.json({
            totalIncome,
            totalExpense,
            balance,
            categoryBreakdown,
            recentTransactions
        });

    } catch (err) {
        res.status(500).json({ msg: "Dashboard error" });
    }
};