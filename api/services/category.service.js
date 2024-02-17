// services/category.service.js
const Category = require('../models/category.model');

exports.getCategoriesByUser = async (userId) => {
    try {
        return await Category.find({ user: userId });
    } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
    }
};

exports.addCategory = async (name, subcategories, userId) => {
    try {
        const newCategory = new Category({
            name,
            subcategories,
            user: userId
        });
        return await newCategory.save();
    } catch (error) {
        throw new Error('Error adding category: ' + error.message);
    }
};

exports.updateCategory = async (id, name, subcategories, userId) => {
    try {
        const category = await Category.findOneAndUpdate({ _id: id, user: userId }, { name, subcategories }, { new: true });
        if (!category) {
            throw new Error('Category not found or unauthorized');
        }
        return category;
    } catch (error) {
        throw new Error('Error updating category: ' + error.message);
    }
};

exports.deleteCategory = async (id, userId) => {
    try {
        const result = await Category.deleteOne({ _id: id, user: userId });
        if (result.deletedCount === 0) {
            throw new Error('Category not found or unauthorized');
        }
    } catch (error) {
        throw new Error('Error deleting category: ' + error.message);
    }
};
