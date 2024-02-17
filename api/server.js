const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const expenseRoutes = require('./routes/expense.routes');
const { connect } = require('./config/db.config');
const logger = require('./logger/api.logger');
const categoryRoutes = require('./routes/category.routes')
const app = express();
app.use(express.json());
app.use(cors());

connect();

app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/category', categoryRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});
