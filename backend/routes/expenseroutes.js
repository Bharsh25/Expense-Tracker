// /routes/expenseRoutes.js

import express from "express";
import {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
} from "../controllers/expensecontroller.js";

import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.use(protect); // 🔐 all routes protected

router.route("/")
    .post(createExpense)
    .get(getExpenses);

router.route("/:id")
    .put(updateExpense)
    .delete(deleteExpense);

export default router;