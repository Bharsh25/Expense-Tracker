import Expense from "../models/expense.js";


// ➤ CREATE EXPENSE
export const createExpense = async (req, res) => {
    try {
        const { title, amount, type, category, note, date } = req.body;

        if (!title || !amount || !type || !category) {
            return res.status(400).json({ msg: "Required fields missing" });
        }

        const expense = await Expense.create({
            userId: req.user._id,
            title,
            amount,
            type,
            category,
            note,
            date
        });

        res.status(201).json(expense);
    } catch (err) {
        res.status(500).json({ msg: "Failed to create expense" });
    }
};


// ➤ GET ALL EXPENSES (with filters)
export const getExpenses = async (req, res) => {
    try {
        const { category, type, startDate, endDate } = req.query;

        let filter = { userId: req.user._id };

        if (category) filter.category = category;
        if (type) filter.type = type;

        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const expenses = await Expense.find(filter).sort({ date: -1 });

        res.json(expenses);
    } catch {
        res.status(500).json({ msg: "Failed to fetch expenses" });
    }
};


// ➤ UPDATE EXPENSE
export const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ msg: "Expense not found" });
        }

        // 🔐 Ownership check (CRITICAL)
        if (expense.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: "Unauthorized" });
        }

        const updated = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch {
        res.status(500).json({ msg: "Failed to update expense" });
    }
};


// ➤ DELETE EXPENSE
export const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ msg: "Expense not found" });
        }

        // 🔐 Ownership check
        if (expense.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: "Unauthorized" });
        }

        await expense.deleteOne();

        res.json({ msg: "Expense deleted" });
    } catch {
        res.status(500).json({ msg: "Failed to delete expense" });
    }
};