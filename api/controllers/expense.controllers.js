// controllers/expense.controller.js
const expenseService = require('../services/expense.service');
const logger = require('../logger/api.logger');

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await expenseService.getExpensesByUserId(req.user.userId);
        logger.info('Expenses retrieved successfully');
        return expenses;
    } catch (error) {
        logger.error(`Error fetching expenses: ${error.message}`);
        throw new Error('Error fetching expenses');
    }
};

exports.addExpense = async (req, res) => {
    try {
        const expenseData = { ...req.body, userId: req.user.userId };
        const expense = await expenseService.addExpense(expenseData);
        logger.info('Expense added successfully');
        return expense;
    } catch (error) {
        logger.error(`Error adding expense: ${error.message}`);
        throw new Error('Error adding expense');
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        const expenseData = req.body;
        const updatedExpense = await expenseService.updateExpense(expenseId, expenseData);
        logger.info(`Expense with ID ${expenseId} updated successfully`);
        return updatedExpense;
    } catch (error) {
        logger.error(`Error updating expense: ${error.message}`);
        throw new Error('Error updating expense');
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        await expenseService.deleteExpense(expenseId);
        logger.info(`Expense with ID ${expenseId} deleted successfully`);
    } catch (error) {
        logger.error(`Error deleting expense: ${error.message}`);
        throw new Error('Error deleting expense');
    }
};
