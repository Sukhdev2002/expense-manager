// models/expense.model.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: String,
    subcategory: String,
    amount: Number,
    comment: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
