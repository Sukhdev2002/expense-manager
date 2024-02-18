// controllers/category.controller.js
const categoryService = require('../services/category.service');
const logger = require("../logger/api.logger");



exports.getCategories = async (req, res) => {
    try {
        const userId = req.user.userId;
        const categories = await categoryService.getCategoriesByUser(userId);
        return categories;
    } catch (error) {
        logger.error(`Error fetching categories: ${error.message}`);
        throw new Error('Error fetching categories');
    }
};



exports.addCategory = async (req, res) => {
    try {
        const { category, subcategories } = req.body;
        const userId = req.user.userId;
        const newCategory = await categoryService.addCategory(category, subcategories, userId);
        logger.info('Category added successfully');
        return newCategory;
        
    } catch (error) {
        logger.error(`Error adding category: ${error.message}`);
        throw new Error('Error adding category');
    }
};


exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, subcategories } = req.body;
        const userId = req.user.userId;
        const updatedCategory = await categoryService.updateCategory(id, category, subcategories, userId);
        logger.info(`Category with ID ${categoryId} updated successfully`);
        return updatedCategory;
    } catch (error) {
        logger.error(`Error updating category: ${error.message}`);
        throw new Error('Error updating category');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        await categoryService.deleteCategory(id, userId);
        logger.info(`Category with ID ${categoryId} deleted successfully`);
    } catch (error) {
        logger.error(`Error deleting category: ${error.message}`);
        throw new Error('Error deleting category');
    }
};


