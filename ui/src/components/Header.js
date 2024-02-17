import React, { useState, useEffect } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';
 // Assuming the JWT token is stored in localStorage after login

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [money, setMoney] = useState('');
    const [comment, setComment] = useState('');
    const [expenses, setExpenses] = useState([]);

    // Fetch categories and expenses from the backend when the component mounts
    useEffect(() => {
        fetchCategories()
        fetchExpenses()
    }, []);

    // const fetchCategories = async () => {
    //     try {
    //
    //         const token = localStorage.getItem('token');
    //         const decodedToken = jwt_decode(token|| ''); // Decode the JWT token to extract the user ID
    //         const userId = decodedToken?.userId;
    //         // Assuming you're storing the token in localStorage
    //         const response = await fetch('http://localhost:5000/api/category', {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //                 // Add any other headers you need
    //             }
    //         });
    //         const data = await response.json();
    //         setCategories(data);
    //     } catch (error) {
    //         console.error('Error fetching categories:', error);
    //     }
    // };
    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwt_decode(token || '');
            const userId = decodedToken?.userId;

            const response = await fetch('http://localhost:5000/api/category', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            // Extract categories and subcategories
            const extractedCategories = data.map(category => ({
                id: category._id,
                name: category.name
            }));
            setCategories(extractedCategories);

            // Extract subcategories
            const extractedSubcategories = data.reduce((acc, category) => {
                const subs = category.subcategories.map(sub => ({
                    id: sub._id,
                    name: sub.name,
                    categoryId: category._id
                }));
                return [...acc, ...subs];
            }, []);
            setSubcategories(extractedSubcategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwt_decode(token|| ''); // Decode the JWT token to extract the user ID
            const userId = decodedToken?.userId;
             // Assuming you're storing the token in localStorage
            const response = await fetch('http://localhost:5000/api/expenses', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    // Add any other headers you need
                }
            });
            const data = await response.json();
            setExpenses(data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };


    const handleAddCategory = async () => {
        try {
            // await fetchExpenses();
            const token = localStorage.getItem('token');
            const decodedToken = jwt_decode(token|| ''); // Decode the JWT token to extract the user ID
            const userId = decodedToken?.userId;
            const response = await fetch('http://localhost:5000/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: userId,
                    category: selectedCategory,
                    subcategories: selectedSubcategory.split(',')
                })
            });
            if (response.ok) {
                console.log('Category added successfully');
                fetchCategories(); // Refresh categories list after adding a new category
            } else {
                console.error('Failed to add category:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleAddExpense = async () => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwt_decode(token|| ''); // Decode the JWT token to extract the user ID
            const userId = decodedToken?.userId;
            const response = await fetch('http://localhost:5000/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the JWT token in the request headers
                },
                body: JSON.stringify({
                    userId: userId, // Include the user ID in the request body
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    money: money,
                    comment: comment
                })
            });
            if (response.ok) {
                console.log('Expense added successfully');
                fetchExpenses(); // Refresh expenses list after adding a new expense
            } else {
                console.error('Failed to add expense:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div>
            <div>
                <h2>Add Category</h2>
                <input type="text" placeholder="Category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} />
                <input type="text" placeholder="Subcategories (comma separated)" value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} />
                <button onClick={handleAddCategory}>Add Category</button>
            </div>
            <div>
                <h2>Add Expense</h2>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
                    <option value="">Select Subcategory</option>
                    {subcategories.map(subcategory => (
                        <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                    ))}
                </select>
                <input type="number" placeholder="Money" value={money} onChange={(e) => setMoney(e.target.value)} />
                <input type="text" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button onClick={handleAddExpense}>Add Expense</button>
            </div>
            <div>
                <h2>Expense List</h2>
                <ul>
                    {expenses.map(expense => (
                        <li key={expense.id}>
                            Category: {expense.category}<br />
                            Subcategory: {expense.subcategory}<br />
                            Money: {expense.money}<br />
                            Comment: {expense.comment}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;
