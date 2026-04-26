
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true },
    note: String,
    date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Expense", expenseSchema);