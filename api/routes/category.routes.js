// routes/category.routes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const logger = require('../logger/api.logger');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const categories = await categoryController.getCategories(req, res);
        logger.info('Categories retrieved successfully');
        res.json(categories);
    } catch (error) {
        logger.error(`Error fetching categories: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const category = await categoryController.addCategory(req, res);
        logger.info('Category added successfully');
        res.status(201).json(category);
    } catch (error) {
        logger.error(`Error adding category: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryController.updateCategory(req, res);
        logger.info(`Category with ID ${categoryId} updated successfully`);
        res.json(category);
    } catch (error) {
        logger.error(`Error updating category: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        await categoryController.deleteCategory(req, res);
        logger.info(`Category with ID ${categoryId} deleted successfully`);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting category: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
