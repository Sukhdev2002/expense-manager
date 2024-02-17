
# Note
all api send token in headers
while update api send in body also 

``const token = localStorage.getItem('token');
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
});``

# Category api
 This API allows users to manage categories and their subcategories. Users can perform CRUD operations (Create, Read, Update, Delete) on categories.

Base URL
The base URL for this API is http://localhost:5000/api/category.

Endpoints
1. GET /api/category
   This endpoint retrieves all categories belonging to the authenticated user.

Response
Status Code: 200 OK
Payload:
json
Copy code
[
{
"_id": "category_id",
"name": "category_name",
"subcategories": [
{
"_id": "subcategory_id",
"name": "subcategory_name"
},
...
]
},
...
]
2. POST /api/category
   This endpoint adds a new category with  subcategories.

Request Payload
category: (string) Name of the category.
subcategories: (array of strings) Optional. Names of subcategories.
3. PUT /api/category/:id
   This endpoint updates an existing category by its ID.

Request Payload
category: (string) New name for the category.
subcategories: (array of strings) Optional. New names for subcategories.
4. DELETE /api/category/:id
   This endpoint deletes a category by its ID.



# Expense API
Overview
This API allows users to manage expenses. Users can perform CRUD operations (Create, Read, Update, Delete) on expenses.

Base URL
The base URL for this API is http://localhost:5000/api/expense.

Endpoints
1. GET /api/expense
   This endpoint retrieves all expenses belonging to the authenticated user.

Response
Status Code: 200 OK
Payload: Array of expense objects
json
Copy code
[
{
"_id": "expense_id",
"category": "expense_category",
"subcategory": "expense_subcategory",
"money": 100,
"comment": "expense_comment"
},
...
]
2. POST /api/expense
   This endpoint adds a new expense.

Request Payload
category: (string) Expense category.
subcategory: (string) Expense subcategory.
money: (number) Amount of money spent.
comment: (string) Optional comment.
3. PUT /api/expense/:expenseId
   This endpoint updates an existing expense by its ID.

Request Payload
category: (string) New expense category.
subcategory: (string) New expense subcategory.
money: (number) New amount of money spent.
comment: (string) New optional comment.
4. DELETE /api/expense/:expenseId
   This endpoint deletes an expense by its ID.




# User API
Overview
This API allows users to register and login.

Base URL
The base URL for this API is http://localhost:5000/api/user.

Endpoints
1. POST /api/user/register
   This endpoint allows users to register.

Request Payload
username: (string) User's username.
password: (string) User's password.
Response
Status Code: 201 Created
Payload: Object with a success message
json
Copy code
{
"message": "User registered successfully"
}
2. POST /api/user/login
   This endpoint allows users to login.

Request Payload
username: (string) User's username.
password: (string) User's password.
Response
Status Code: 200 OK
Payload: Object with a JWT token
json
Copy code
{
"token": "jwt_token"
}
Make sure to replace jwt_token with the actual JWT token generated upon successful login.




