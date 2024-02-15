// routes/expense.routes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controllers');
const authMiddleware = require('../middlewares/auth.middleware');
const logger = require('../logger/api.logger');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const expenses = await expenseController.getExpenses(req, res);
        logger.info('Expenses retrieved successfully');
        res.json(expenses);
    } catch (error) {
        logger.error(`Error fetching expenses: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const expense = await expenseController.addExpense(req, res);
        logger.info('Expense added successfully');
        res.status(201).json(expense);
    } catch (error) {
        logger.error(`Error adding expense: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/:expenseId', async (req, res) => {
    try {
        const { expenseId } = req.params;
        const expense = await expenseController.updateExpense(req, res);
        logger.info(`Expense with ID ${expenseId} updated successfully`);
        res.json(expense);
    } catch (error) {
        logger.error(`Error updating expense: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/:expenseId', async (req, res) => {
    try {
        const { expenseId } = req.params;
        await expenseController.deleteExpense(req, res);
        logger.info(`Expense with ID ${expenseId} deleted successfully`);
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting expense: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
