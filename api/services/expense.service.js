// services/expense.services.js
const Expense = require('../models/expense.model');
const logger = require('../logger/api.logger');

exports.getExpensesByUserId = async (userId) => {
    try {
        const expenses = await Expense.find({ userId });
        return expenses;
    } catch (error) {
        logger.error(`Error fetching expenses: ${error.message}`);
        throw new Error('Error fetching expenses');
    }
};

exports.addExpense = async (expenseData) => {
    try {
        const expense = new Expense(expenseData);
        const newExpense = await expense.save();
        return newExpense;
    } catch (error) {
        logger.error(`Error adding expense: ${error.message}`);
        throw new Error('Error adding expense');
    }
};

exports.updateExpense = async (expenseId, expenseData) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, expenseData, { new: true });
        if (!updatedExpense) {
            throw new Error('Expense not found');
        }
        return updatedExpense;
    } catch (error) {
        logger.error(`Error updating expense: ${error.message}`);
        throw new Error('Error updating expense');
    }
};

exports.deleteExpense = async (expenseId) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(expenseId);
        if (!deletedExpense) {
            throw new Error('Expense not found');
        }
    } catch (error) {
        logger.error(`Error deleting expense: ${error.message}`);
        throw new Error('Error deleting expense');
    }
};
